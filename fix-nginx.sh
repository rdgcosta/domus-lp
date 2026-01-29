#!/bin/bash

# Script para executar DIRETAMENTE no servidor
# Corrige o nginx removendo configuração SSL

echo "🔧 Corrigindo nginx..."

# Parar nginx
docker compose stop nginx

# Verificar se estamos no diretório correto
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Execute este script no diretório do projeto (onde está docker-compose.yml)"
    exit 1
fi

# Verificar se default-init.conf existe
if [ ! -f "nginx/conf.d/default-init.conf" ]; then
    echo "❌ Arquivo nginx/conf.d/default-init.conf não encontrado"
    exit 1
fi

# Remover default.conf atual
echo "📝 Removendo configuração atual..."
rm -f nginx/conf.d/default.conf

# Copiar configuração sem SSL
echo "📝 Aplicando configuração sem SSL..."
cp nginx/conf.d/default-init.conf nginx/conf.d/default.conf

# Verificar conteúdo
if grep -q "ssl_certificate" nginx/conf.d/default.conf; then
    echo "⚠️  AVISO: Arquivo ainda contém SSL. Verificando..."
    # Forçar criação do arquivo correto
    cat > nginx/conf.d/default.conf << 'EOF'
# Configuração SEM SSL - use antes de gerar certificado

server {
    listen 80;
    listen [::]:80;
    server_name domusitalinea.com.br www.domusitalinea.com.br;

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
        proxy_cache_valid 200 60d;
        add_header Cache-Control "public, immutable";
    }

    location /images {
        proxy_pass http://app:3000;
        proxy_cache_valid 200 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF
    echo "✅ Arquivo recriado sem SSL"
fi

# Verificar se não tem SSL
if ! grep -q "ssl_certificate" nginx/conf.d/default.conf; then
    echo "✅ Configuração sem SSL confirmada"
else
    echo "❌ ERRO: Arquivo ainda contém SSL!"
    exit 1
fi

# Reiniciar nginx
echo "🔄 Reiniciando nginx..."
docker compose up -d nginx

# Aguardar um pouco
sleep 3

# Verificar logs
echo "📋 Últimas linhas do log do nginx:"
docker compose logs nginx --tail 10

echo ""
echo "✅ Concluído!"
echo "📝 Verifique se nginx está rodando: docker compose ps"
echo "🌐 Teste: curl http://localhost"
