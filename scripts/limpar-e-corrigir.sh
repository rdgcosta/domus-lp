#!/bin/bash

# Script para LIMPAR tudo e garantir configuração correta

echo "🧹 Limpando e corrigindo configuração do nginx..."

# Parar tudo
docker compose down

# Remover TODOS os arquivos de configuração
rm -f nginx/conf.d/*.conf

# Criar APENAS o arquivo sem SSL
cat > nginx/conf.d/default.conf << 'EOF'
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
EOF

echo "✅ Arquivo criado"

# Verificar conteúdo
echo "📋 Verificando conteúdo do arquivo:"
cat nginx/conf.d/default.conf | head -10

# Verificar se tem SSL
if grep -q "ssl_certificate\|listen 443" nginx/conf.d/default.conf; then
    echo "❌ ERRO: Arquivo ainda contém SSL!"
    echo "Conteúdo:"
    cat nginx/conf.d/default.conf
    exit 1
fi

echo "✅ Arquivo está SEM SSL"

# Reiniciar
echo "🔄 Iniciando containers..."
docker compose up -d

# Aguardar
sleep 5

# Verificar logs
echo "📋 Logs do nginx:"
docker compose logs nginx --tail 20

echo ""
echo "✅ Concluído!"
echo "📝 Status: docker compose ps"
