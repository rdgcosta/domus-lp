#!/bin/bash

# Script para ativar SSL após certificado ser gerado

DOMAIN="domusitalinea.com.br"

echo "🔒 Ativando SSL no nginx..."

# Verificar se certificado existe
if docker compose exec nginx test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem 2>/dev/null; then
    echo "✅ Certificado encontrado"
else
    echo "❌ Certificado SSL não encontrado!"
    echo "📝 Primeiro gere o certificado com:"
    echo "   ./scripts/gerar-ssl.sh"
    exit 1
fi

# Parar nginx
echo "⏳ Parando nginx..."
docker compose stop nginx

# Modificar arquivo local
cd "$(dirname "$0")/.."

# Verificar se existe arquivo SSL (pode estar como .disabled)
SSL_FILE="nginx/conf.d/default-ssl.conf"
if [ ! -f "$SSL_FILE" ]; then
    if [ -f "nginx/conf.d/default-ssl.conf.disabled" ]; then
        SSL_FILE="nginx/conf.d/default-ssl.conf.disabled"
        echo "📝 Usando arquivo SSL renomeado (.disabled)"
    else
        echo "❌ Arquivo de configuração SSL não encontrado!"
        echo "📝 Criando configuração SSL..."
        # Criar arquivo SSL se não existir
        cat > nginx/conf.d/default-ssl.conf << 'SSL_EOF'
# HTTP server - redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name domusitalinea.com.br www.domusitalinea.com.br;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        try_files $uri =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name domusitalinea.com.br www.domusitalinea.com.br;

    ssl_certificate /etc/letsencrypt/live/domusitalinea.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domusitalinea.com.br/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript;

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
SSL_EOF
        SSL_FILE="nginx/conf.d/default-ssl.conf"
    fi
fi

if [ -f "$SSL_FILE" ]; then
    echo "📝 Aplicando configuração SSL..."
    rm -f nginx/conf.d/default.conf
    cp "$SSL_FILE" nginx/conf.d/default.conf
    
    # Verificar se foi aplicado
    if grep -q "ssl_certificate" nginx/conf.d/default.conf; then
        echo "✅ Configuração SSL aplicada"
    else
        echo "❌ Erro ao aplicar configuração SSL"
        exit 1
    fi
else
    echo "❌ Arquivo nginx/conf.d/default-ssl.conf não encontrado"
    exit 1
fi

# Reiniciar nginx
echo "🔄 Reiniciando nginx..."
docker compose up -d nginx

# Aguardar um pouco
sleep 3

# Verificar logs
echo "📋 Verificando logs..."
docker compose logs nginx --tail 20

echo ""
echo "✅ SSL ativado!"
echo "🌐 Acesse: https://$DOMAIN"
echo ""
echo "📝 Para renovar certificado automaticamente, adicione ao crontab:"
echo "   0 3 * * * cd ~/domus-lp && docker compose run --rm certbot renew && docker compose exec nginx nginx -s reload"
