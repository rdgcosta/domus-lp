#!/bin/bash

# Script para FORÇAR configuração correta do nginx SEM SSL
# Execute este script no servidor

echo "🔧 Corrigindo nginx - removendo SSL..."

# Parar nginx
docker compose stop nginx

# Criar arquivo correto SEM SSL diretamente
cat > nginx/conf.d/default.conf << 'NGINX_EOF'
# Configuração SEM SSL - apenas HTTP

server {
    listen 80;
    listen [::]:80;
    server_name domusitalinea.com.br www.domusitalinea.com.br _;

    # For Let's Encrypt / Certbot
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        try_files $uri =404;
    }

    # Proxy to Next.js app
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

    # Cache static assets
    location /_next/static {
        proxy_pass http://app:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Cache images
    location /images {
        proxy_pass http://app:3000;
        add_header Cache-Control "public, max-age=2592000";
    }
}
NGINX_EOF

echo "✅ Arquivo default.conf criado SEM SSL"

# Verificar se não tem SSL
if grep -q "ssl_certificate" nginx/conf.d/default.conf; then
    echo "❌ ERRO: Arquivo ainda contém SSL!"
    exit 1
fi

# Reiniciar nginx
echo "🔄 Reiniciando nginx..."
docker compose up -d nginx

# Aguardar
sleep 3

# Verificar logs
echo "📋 Logs do nginx:"
docker compose logs nginx --tail 15

echo ""
echo "✅ Concluído!"
echo "📝 Verifique: docker compose ps"
echo "🌐 Teste: curl http://localhost"
