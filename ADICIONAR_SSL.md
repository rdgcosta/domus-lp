# 🔒 Como Adicionar SSL - Passo a Passo

## ✅ Pré-requisitos

- Nginx funcionando em HTTP (porta 80) ✅
- DNS apontando para o servidor
- Porta 80 acessível publicamente

## 🚀 Passo a Passo

### 1. Gerar Certificado SSL

```bash
cd ~/domus-lp

# Opção A: Usar script automatizado
chmod +x scripts/gerar-ssl.sh
./scripts/gerar-ssl.sh domusitalinea.com.br contato@domusitalinea.com.br

# Opção B: Comando manual
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email contato@domusitalinea.com.br \
  --agree-tos \
  --no-eff-email \
  -d domusitalinea.com.br \
  -d www.domusitalinea.com.br
```

**Importante**: 
- Certifique-se de que o DNS está apontando para o servidor
- O domínio deve estar acessível via HTTP antes de gerar o certificado

### 2. Verificar se Certificado foi Gerado

```bash
# Verificar se certificado existe
docker compose exec nginx ls -la /etc/letsencrypt/live/domusitalinea.com.br/

# Deve mostrar: fullchain.pem e privkey.pem
```

### 3. Ativar SSL no Nginx

```bash
# Opção A: Usar script automatizado
chmod +x scripts/ativar-ssl.sh
./scripts/ativar-ssl.sh

# Opção B: Manual
docker compose stop nginx

# Renomear arquivo SSL e aplicar
mv nginx/conf.d/default-ssl.conf.disabled nginx/conf.d/default-ssl.conf 2>/dev/null || true
rm -f nginx/conf.d/default.conf
cp nginx/conf.d/default-ssl.conf nginx/conf.d/default.conf

docker compose up -d nginx
docker compose logs nginx
```

### 4. Verificar SSL

```bash
# Ver logs
docker compose logs nginx

# Testar HTTPS
curl https://domusitalinea.com.br

# Ou acesse no navegador
# https://domusitalinea.com.br
```

## 🔄 Renovação Automática

Para renovar automaticamente, adicione ao crontab:

```bash
crontab -e

# Adicionar linha (renova às 3h da manhã):
0 3 * * * cd ~/domus-lp && docker compose run --rm certbot renew && docker compose exec nginx nginx -s reload
```

## 📝 Resumo dos Comandos

```bash
# 1. Gerar certificado
./scripts/gerar-ssl.sh domusitalinea.com.br seu-email@exemplo.com

# 2. Ativar SSL
./scripts/ativar-ssl.sh

# 3. Verificar
curl https://domusitalinea.com.br
```

## 🐛 Troubleshooting

### Erro: "Failed to connect"
- Verifique DNS: `dig domusitalinea.com.br`
- Verifique se porta 80 está acessível

### Erro: "Challenge failed"
- Certifique-se de que `/.well-known/acme-challenge/` está acessível
- Verifique logs: `docker compose logs nginx`

### Certificado gerado mas nginx não inicia
- Verifique se certificado existe: `docker compose exec nginx ls /etc/letsencrypt/live/domusitalinea.com.br/`
- Verifique configuração: `docker compose exec nginx nginx -t`
