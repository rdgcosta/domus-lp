#!/bin/bash

# Script para ativar SSL após certificado ser gerado

DOMAIN="domusitalinea.com.br"

echo "🔒 Ativando configuração SSL..."

# Verificar se certificado existe
if docker compose exec nginx test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem; then
    echo "✅ Certificado encontrado"
    
    # Parar nginx
    docker compose stop nginx
    
    # Trocar configuração
    docker compose run --rm --entrypoint "sh" nginx -c "
        cd /etc/nginx/conf.d
        if [ -f default-ssl.conf ]; then
            rm -f default.conf
            cp default-ssl.conf default.conf
            echo '✅ Configuração SSL ativada'
        else
            echo '❌ Arquivo default-ssl.conf não encontrado'
            exit 1
        fi
    "
    
    # Reiniciar nginx
    docker compose up -d nginx
    
    echo "✅ SSL ativado! Nginx reiniciado."
    echo "🌐 Acesse: https://$DOMAIN"
else
    echo "❌ Certificado SSL não encontrado!"
    echo "📝 Primeiro gere o certificado com:"
    echo "   docker compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot --email seu-email@exemplo.com --agree-tos --no-eff-email -d $DOMAIN -d www.$DOMAIN"
    exit 1
fi
