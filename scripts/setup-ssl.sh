#!/bin/bash

# Script simplificado para configurar SSL
# Execute este script após configurar o domínio no nginx

echo "🚀 Configurando SSL com Certbot..."

# Verifique se o domínio está configurado
read -p "Digite seu domínio (ex: domusitalinea.com.br): " DOMAIN
read -p "Digite seu email para notificações do Let's Encrypt: " EMAIL

# Atualizar nginx/conf.d/default.conf com o domínio correto
sed -i.bak "s/domusitalinea.com.br/$DOMAIN/g" nginx/conf.d/default.conf
sed -i.bak "s/domusitalinea.com.br/$DOMAIN/g" nginx/conf.d/default-ssl.conf

# Criar diretório para certificados
mkdir -p certbot/conf/live/$DOMAIN

# Iniciar containers sem SSL primeiro
echo "📦 Iniciando containers..."
docker compose up -d app nginx

# Aguardar nginx iniciar
echo "⏳ Aguardando nginx iniciar..."
sleep 5

# Solicitar certificado SSL
echo "🔒 Solicitando certificado SSL..."
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN \
  -d www.$DOMAIN

# Recarregar nginx com SSL
echo "🔄 Recarregando nginx com SSL..."
docker compose exec nginx nginx -s reload

echo "✅ SSL configurado com sucesso!"
echo "🌐 Acesse: https://$DOMAIN"
