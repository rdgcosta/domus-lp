#!/bin/bash

# Solução FINAL - Remove todos os arquivos com SSL e cria apenas o sem SSL

echo "🔧 Solução Final - Corrigindo nginx..."

# Parar nginx
docker compose stop nginx

# Remover TODOS os arquivos .conf
echo "🧹 Removendo arquivos de configuração..."
rm -f nginx/conf.d/*.conf

# Renomear default-ssl.conf se existir para não ser carregado
if [ -f nginx/conf.d/default-ssl.conf ]; then
    mv nginx/conf.d/default-ssl.conf nginx/conf.d/default-ssl.conf.disabled
    echo "✅ default-ssl.conf renomeado para .disabled"
fi

# Criar APENAS o arquivo sem SSL
echo "📝 Criando configuração sem SSL..."
cat > nginx/conf.d/default.conf << 'NGINX_CONFIG'
server {
    listen 80;
    listen [::]:80;
    server_name _;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        try_files $uri =404;
    }

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    location /_next/static {
        proxy_pass http://app:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /images {
        proxy_pass http://app:3000;
        add_header Cache-Control "public, max-age=2592000";
    }
}
NGINX_CONFIG

echo "✅ Arquivo criado"

# Verificar que não tem SSL
echo "🔍 Verificando arquivo..."
if grep -q "ssl_certificate\|listen 443" nginx/conf.d/default.conf; then
    echo "❌ ERRO: Arquivo ainda contém SSL!"
    cat nginx/conf.d/default.conf
    exit 1
fi

echo "✅ Confirmado: Arquivo SEM SSL"

# Listar arquivos
echo "📋 Arquivos em nginx/conf.d/:"
ls -la nginx/conf.d/

# Reiniciar
echo "🔄 Reiniciando nginx..."
docker compose up -d nginx

# Aguardar
sleep 5

# Verificar logs
echo ""
echo "📋 Logs do nginx (últimas 20 linhas):"
docker compose logs nginx --tail 20

echo ""
echo "✅ Concluído!"
echo ""
echo "📝 Verificar status: docker compose ps"
echo "🌐 Testar: curl http://localhost"
