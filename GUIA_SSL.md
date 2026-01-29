# 🔒 Guia de SSL com Certbot

## ✅ Configuração Atual

- Nginx funcionando em HTTP (porta 80)
- Certbot configurado mas não inicia automaticamente
- Scripts prontos para gerar e ativar SSL

## 🚀 Como Gerar Certificado SSL

### Passo 1: Gerar Certificado

```bash
# No servidor, dentro do diretório do projeto
cd ~/domus-lp

# Gerar certificado (ajuste domínio e email se necessário)
chmod +x scripts/gerar-ssl.sh
./scripts/gerar-ssl.sh domusitalinea.com.br contato@domusitalinea.com.br

# Ou manualmente:
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email contato@domusitalinea.com.br \
  --agree-tos \
  --no-eff-email \
  -d domusitalinea.com.br \
  -d www.domusitalinea.com.br
```

### Passo 2: Ativar SSL no Nginx

```bash
# Após certificado ser gerado com sucesso
chmod +x scripts/ativar-ssl.sh
./scripts/ativar-ssl.sh

# Ou manualmente:
docker compose stop nginx
rm -f nginx/conf.d/default.conf
cp nginx/conf.d/default-ssl.conf nginx/conf.d/default.conf
docker compose up -d nginx
```

### Passo 3: Verificar

```bash
# Ver logs
docker compose logs nginx

# Testar HTTPS
curl https://domusitalinea.com.br
```

## 🔄 Renovação Automática

### Opção 1: Cron Job (Recomendado)

Adicione ao crontab:

```bash
crontab -e

# Adicionar linha:
0 3 * * * cd ~/domus-lp && ./scripts/renovar-ssl.sh
```

### Opção 2: Container Automático

Para iniciar o container de renovação automática:

```bash
docker compose --profile ssl up -d certbot
```

## 📋 Checklist

- [ ] DNS apontando para o servidor
- [ ] Porta 80 acessível
- [ ] Certificado SSL gerado
- [ ] SSL ativado no nginx
- [ ] Site acessível via HTTPS
- [ ] Renovação automática configurada

## 🐛 Troubleshooting

### Certificado não gerado
- Verifique DNS: `dig domusitalinea.com.br`
- Verifique porta 80: `curl http://domusitalinea.com.br`
- Verifique logs: `docker compose logs certbot`

### Nginx não inicia com SSL
- Verifique certificado: `docker compose exec nginx ls -la /etc/letsencrypt/live/domusitalinea.com.br/`
- Verifique configuração: `docker compose exec nginx nginx -t`

### Renovação falha
- Verifique se porta 80 está acessível
- Verifique logs: `docker compose logs certbot`
