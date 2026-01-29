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

if [ -f nginx/conf.d/default-ssl.conf ]; then
    echo "📝 Aplicando configuração SSL..."
    rm -f nginx/conf.d/default.conf
    cp nginx/conf.d/default-ssl.conf nginx/conf.d/default.conf
    
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
