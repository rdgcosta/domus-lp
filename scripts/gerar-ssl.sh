#!/bin/bash

# Script para gerar certificado SSL com Certbot

DOMAIN="${1:-domusitalinea.com.br}"
EMAIL="${2:-contato@domusitalinea.com.br}"

echo "🔒 Gerando certificado SSL para $DOMAIN"
echo "📧 Email: $EMAIL"
echo ""

# Verificar se nginx está rodando
if ! docker compose ps nginx | grep -q "Up"; then
    echo "❌ Nginx não está rodando. Inicie primeiro: docker compose up -d nginx"
    exit 1
fi

# Verificar se o domínio está acessível
echo "⏳ Verificando se o domínio está acessível..."
if ! curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN | grep -q "200\|301\|302"; then
    echo "⚠️  AVISO: Domínio pode não estar acessível. Certifique-se de que o DNS está configurado."
    read -p "Continuar mesmo assim? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Gerar certificado
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
    echo ""
    echo "✅ Certificado gerado com sucesso!"
    echo ""
    echo "📝 Próximo passo: Ativar SSL no nginx"
    echo "   Execute: ./scripts/ativar-ssl.sh"
else
    echo ""
    echo "❌ Erro ao gerar certificado"
    echo "📋 Verifique os logs acima para mais detalhes"
    exit 1
fi
