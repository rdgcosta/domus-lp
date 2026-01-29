#!/bin/bash

# Script para executar DIRETAMENTE no servidor
# Ativa SSL após certificado ser gerado

DOMAIN="domusitalinea.com.br"

echo "🔒 Ativando configuração SSL..."

# Verificar se certificado existe
if docker compose exec nginx test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem; then
    echo "✅ Certificado encontrado"
    
    # Parar nginx
    docker compose stop nginx
    
    # Modificar arquivo local (não dentro do container)
    cd "$(dirname "$0")/.."
    
    if [ -f nginx/conf.d/default-ssl.conf ]; then
        rm -f nginx/conf.d/default.conf
        cp nginx/conf.d/default-ssl.conf nginx/conf.d/default.conf
        echo "✅ Configuração SSL aplicada localmente"
    else
        echo "❌ Arquivo default-ssl.conf não encontrado"
        exit 1
    fi
    
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
