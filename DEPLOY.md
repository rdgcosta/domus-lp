# 🚀 Deploy - Domus Italínea

Guia para colocar o site no ar com Docker (app + Nginx). SSL é opcional e pode ser ativado depois.

---

## Pré-requisitos no servidor

- **Docker** e **Docker Compose** instalados
- **Git** (para clonar o repositório)
- Domínio apontando para o IP do servidor (para usar HTTPS depois)
- Portas **80** e **443** liberadas no firewall

---

## 1. Primeira vez (servidor novo)

### 1.1 Clonar o projeto

```bash
# Exemplo: clonar na pasta do usuário
cd ~
git clone <URL_DO_SEU_REPOSITORIO> domus-lp
cd domus-lp
```

### 1.2 Configurar variáveis de ambiente

```bash
cp .env.example .env
nano .env   # ou vim / code
```

Preencha pelo menos:

- `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` (se usar Google Tag Manager)
- `DOMAIN=domusitalinea.com.br`
- `SSL_EMAIL=contato@domusitalinea.com.br` (para Certbot depois)

Salve e feche.

### 1.3 Fazer o deploy

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

Isso faz o **build** da aplicação e sobe **app** + **nginx**. O site fica em **HTTP** na porta 80.

### 1.4 (Opcional) Ativar HTTPS

Quando o site já estiver respondendo em HTTP e o DNS estiver apontando para o servidor:

```bash
./scripts/gerar-ssl.sh domusitalinea.com.br contato@domusitalinea.com.br
./scripts/ativar-ssl.sh
```

Detalhes em [ADICIONAR_SSL.md](./ADICIONAR_SSL.md).

---

## 2. Atualizações (já tem o projeto no servidor)

Sempre na pasta do projeto:

```bash
cd ~/domus-lp   # ou onde estiver o projeto
git pull
./scripts/deploy.sh
```

O script faz **build** de novo e sobe os containers. Não é necessário parar manualmente antes.

---

## 3. Comandos úteis

| Ação | Comando |
|------|--------|
| Ver logs da aplicação | `docker compose logs -f app` |
| Ver logs do Nginx | `docker compose logs -f nginx` |
| Ver status dos containers | `docker compose ps` |
| Parar tudo | `docker compose down` |
| Reiniciar só a app | `docker compose restart app` |
| Rebuild sem cache | `docker compose build --no-cache app` |

---

## 4. Checklist antes do deploy

- [ ] `.env` criado a partir de `.env.example` e preenchido
- [ ] `NEXT_PUBLIC_GTM_ID` no `.env` se usar GTM (o valor é usado no **build**)
- [ ] DNS do domínio apontando para o IP do servidor (para SSL depois)
- [ ] Portas 80 e 443 liberadas no firewall do servidor

---

## 5. Resumo rápido

```bash
# Primeira vez
git clone <repo> domus-lp && cd domus-lp
cp .env.example .env && nano .env
./scripts/deploy.sh

# Atualização
cd ~/domus-lp && git pull && ./scripts/deploy.sh
```

Depois, se quiser HTTPS: `./scripts/gerar-ssl.sh` e `./scripts/ativar-ssl.sh`.
