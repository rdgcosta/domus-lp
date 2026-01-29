# 🐳 Deploy com Docker e SSL (Certbot)

## Estrutura Criada

```
lp/
├── Dockerfile              # Build da aplicação Next.js
├── docker-compose.yml      # Orquestração dos serviços
├── .dockerignore          # Arquivos ignorados no build
├── nginx/
│   ├── nginx.conf         # Configuração principal do nginx
│   └── conf.d/
│       ├── default.conf   # Configuração com SSL
│       └── default-ssl.conf  # Configuração temporária para inicialização
└── scripts/
    ├── init-letsencrypt.sh    # Script completo de inicialização
    └── setup-ssl.sh           # Script simplificado
```

## 🚀 Deploy Rápido

### 1. Configurar Domínio

Edite `nginx/conf.d/default.conf` e substitua `domusitalinea.com.br` pelo seu domínio.

### 2. Build e Iniciar

```bash
# Build da aplicação
docker compose build

# Iniciar todos os serviços
docker compose up -d
```

### 3. Configurar SSL (Primeira Vez)

```bash
# Opção 1: Script automatizado
chmod +x scripts/setup-ssl.sh
./scripts/setup-ssl.sh

# Opção 2: Manual
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email seu-email@exemplo.com \
  --agree-tos \
  --no-eff-email \
  -d domusitalinea.com.br \
  -d www.domusitalinea.com.br

# Recarregar nginx
docker compose exec nginx nginx -s reload
```

## 📋 Serviços

- **app**: Aplicação Next.js (porta 3000 interno)
- **nginx**: Proxy reverso com SSL (portas 80 e 443)
- **certbot**: Renovação automática de certificados SSL

## 🔄 Comandos Úteis

```bash
# Ver logs
docker compose logs -f app
docker compose logs -f nginx

# Reiniciar
docker compose restart app

# Parar tudo
docker compose down

# Rebuild após mudanças
docker compose build app
docker compose up -d app
```

## ⚠️ Importante

1. Certifique-se de que o DNS está apontando para o servidor antes de solicitar SSL
2. Portas 80 e 443 devem estar acessíveis
3. O Certbot renova automaticamente os certificados a cada 12h
