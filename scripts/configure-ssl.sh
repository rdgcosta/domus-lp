#!/bin/bash

# Script para configurar SSL após certificado ser gerado

DOMAIN="domusitalinea.com.br"
EMAIL="${SSL_EMAIL:-contato@domusitalinea.com.br}"

echo "🔒 Configurando SSL para $DOMAIN..."

# Verificar se certificado existe
if docker compose exec nginx test -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem; then
    echo "✅ Certificado SSL já existe"
    
    # Garantir que default.conf está ativo
    docker compose exec nginx sh -c "
        if [ ! -f /etc/nginx/conf.d/default.conf ] || ! grep -q 'ssl_certificate' /etc/nginx/conf.d/default.conf; then
            echo 'Ativando configuração SSL...'
            rm -f /etc/nginx/conf.d/default.conf
            # O arquivo default.conf com SSL deve estar no volume
        fi
    "
    
    # Recarregar nginx
    docker compose exec nginx nginx -s reload
    echo "✅ Nginx recarregado com SSL"
else
    echo "📝 Certificado SSL não encontrado. Gerando..."
    
    # Parar nginx temporariamente
    docker compose stop nginx
    
    # Usar configuração inicial
    docker compose run --rm --entrypoint "sh" nginx -c "
        rm -f /etc/nginx/conf.d/default.conf
        cp /etc/nginx/conf.d/default-init.conf /etc/nginx/conf.d/default.conf
    "
    
    # Iniciar nginx
    docker compose up -d nginx
    
    # Aguardar nginx iniciar
    echo "⏳ Aguardando nginx iniciar..."
    sleep 5
    
    # Solicitar certificado
    echo "🔐 Solicitando certificado SSL..."
    docker compose run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --force-renewal \
        -d $DOMAIN \
        -d www.$DOMAIN
    
    if [ $? -eq 0 ]; then
        echo "✅ Certificado gerado com sucesso!"
        
        # Ativar configuração SSL
        docker compose exec nginx sh -c "
            rm -f /etc/nginx/conf.d/default.conf
            # O default.conf com SSL será usado automaticamente na próxima inicialização
        "
        
        # Reiniciar nginx
        docker compose restart nginx
        echo "✅ SSL configurado e nginx reiniciado"
    else
        echo "❌ Erro ao gerar certificado"
        exit 1
    fi
fi

echo "🌐 Acesse: https://$DOMAIN"
