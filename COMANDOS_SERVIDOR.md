# 🔧 Comandos para Executar no Servidor

## ⚠️ Problema: Volume Read-Only

O volume estava montado como read-only. Agora está corrigido no docker-compose.yml.

## ✅ Solução Rápida

### Opção 1: Modificar arquivos locais (Recomendado)

```bash
# No servidor, dentro do diretório do projeto
cd ~/domus-lp

# Parar nginx
docker compose stop nginx

# Modificar arquivo LOCAL (não dentro do container)
rm -f nginx/conf.d/default.conf
cp nginx/conf.d/default-init.conf nginx/conf.d/default.conf

# Reiniciar nginx
docker compose up -d nginx

# Verificar
docker compose logs nginx
docker compose ps
```

### Opção 2: Usar script automatizado

```bash
# No servidor
cd ~/domus-lp
chmod +x scripts/fix-nginx-servidor.sh
./scripts/fix-nginx-servidor.sh
```

## 🔒 Após Gerar Certificado SSL

```bash
# Gerar certificado
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email contato@domusitalinea.com.br \
  --agree-tos \
  --no-eff-email \
  -d domusitalinea.com.br \
  -d www.domusitalinea.com.br

# Ativar SSL (modificar arquivo local)
cd ~/domus-lp
docker compose stop nginx
rm -f nginx/conf.d/default.conf
cp nginx/conf.d/default-ssl.conf nginx/conf.d/default.conf
docker compose up -d nginx

# Ou usar script
chmod +x scripts/ativar-ssl-servidor.sh
./scripts/ativar-ssl-servidor.sh
```

## 📝 Importante

- Os arquivos são modificados **localmente no servidor**, não dentro do container
- Após modificar, reinicie o container para aplicar mudanças
- O volume agora permite escrita (removido `:ro`)
