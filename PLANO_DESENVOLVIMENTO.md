# Plano de Desenvolvimento - Landing Page Domus Italinea

## 📋 Visão Geral
Landing page moderna e responsiva para loja de móveis planejados Domus Italinea, desenvolvida em Next.js 14+ com foco em SEO e performance.

## 🎯 Objetivos
- Apresentar a marca Domus Italinea de forma elegante e profissional
- Converter visitantes em leads/contatos
- Otimização completa para SEO
- Performance otimizada (Core Web Vitals)
- Design moderno e responsivo

## 🏗️ Estrutura da Landing Page

### 1. **Hero Section**
- Imagem emocional com pessoas em ambiente real
- Headline: **"Seu projeto de felicidade"** (tagline institucional)
- Subtítulo com proposta de valor emocional
- CTA humano: "Vamos criar seu projeto juntos"
- Imagens sempre com pessoas reais em momentos cotidianos

### 2. **Manifesto da Marca**
- Texto curto explicando a filosofia Italínea
- Tom acolhedor, positivo, inspirador
- Foco em pessoas vivendo os espaços
- Mensagem: "Mais do que móveis, criamos espaços para viver"

### 3. **Ambientes / Soluções**
- Cozinha
- Dormitório
- Living
- Home Office
- Imagens com pessoas em ambientes reais, bem iluminados e vividos

### 4. **Galeria de Projetos**
- Grid de imagens de projetos realizados
- Filtros por ambiente (cozinha, quarto, sala, etc.)
- Lightbox para visualização ampliada
- Depoimentos de clientes

### 5. **Processo de Trabalho**
- Passo a passo do processo
- Timeline visual
- O que esperar em cada etapa

### 6. **Diferenciais**
- Materiais de qualidade
- Design exclusivo
- Mão de obra especializada
- Garantia e pós-venda
- Atendimento personalizado

### 5. **Chamada para Ação**
- Conversa, projeto personalizado, visita à loja
- CTA humano: "Vamos criar seu projeto juntos"
- Formulário de contato com tom acolhedor
- Evitar urgência artificial ou linguagem agressiva de vendas

### 4. **Prova Social**
- Projetos reais com pessoas
- Depoimentos de clientes
- Tempo de mercado
- Ambientes bem iluminados, sofisticados, mas vividos

### 9. **FAQ (Perguntas Frequentes)**
- Accordion com perguntas comuns
- Otimizado para rich snippets

### 10. **Rodapé**
- Links importantes
- Redes sociais
- Informações de contato
- Mapa (opcional)
- Política de privacidade

## 🛠️ Stack Tecnológica

### Core
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript**
- **Tailwind CSS** (estilização)

### SEO & Performance
- **next-seo** ou **next-seo.mdx** (meta tags)
- **next/image** (otimização de imagens)
- **Schema.org JSON-LD** (dados estruturados)
- **Sitemap.xml** automático
- **Robots.txt**

### Componentes & UI
- **Framer Motion** (animações suaves)
- **React Hook Form** (formulários)
- **Zod** (validação)
- **Lucide React** (ícones)

### Outros
- **React Intersection Observer** (lazy loading/animações)
- **Sharp** (processamento de imagens)

## 📁 Estrutura de Pastas

```
lp/
├── app/
│   ├── layout.tsx          # Layout principal com metadata
│   ├── page.tsx            # Página inicial
│   ├── globals.css         # Estilos globais
│   └── sitemap.ts          # Sitemap dinâmico
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Gallery.tsx
│   │   ├── Process.tsx
│   │   ├── Differentiators.tsx
│   │   ├── Contact.tsx
│   │   ├── Testimonials.tsx
│   │   └── FAQ.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Form.tsx
│   │   └── Modal.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── utils.ts
│   └── seo.ts
├── public/
│   ├── images/
│   └── favicon.ico
├── types/
│   └── index.ts
└── package.json
```

## 🎨 Design & UX

### Paleta de Cores (Identidade da Marca)
- **Primária**: Azul Italínea #164187 (confiança, base da interface)
- **Secundária**: Tons nude/alaranjados #FF9C73, #FFD0B9 (acolhimento, destaque emocional)
- **Neutros**: Branco, cinza claro

### Tipografia
- **Fonte Oficial**: Filson Soft (moderna, amigável, legível)
- Características: suave, sem rigidez, confortável para leitura longa

### Grafismos
- **Círculos em outline**: representam ciclos, continuidade, leveza e fluidez
- Uso como elementos de apoio (backgrounds, divisões, destaques visuais)
- Nunca competir com conteúdo principal

### Princípios de Design
- Espaçamento generoso
- Imagens de alta qualidade
- Animações sutis e profissionais
- Mobile-first approach
- Acessibilidade (WCAG 2.1)

## 🔍 Otimizações SEO

### Meta Tags Essenciais
- Title otimizado com palavras-chave
- Meta description única e atrativa
- Open Graph tags (Facebook/LinkedIn)
- Twitter Cards
- Canonical URLs

### Dados Estruturados (Schema.org)
- Organization
- LocalBusiness
- Service
- Review/Rating
- FAQPage
- BreadcrumbList

### Performance
- Lazy loading de imagens
- Code splitting automático
- Minificação de CSS/JS
- Compressão de imagens (WebP/AVIF)
- Font optimization
- Preload de recursos críticos

### Conteúdo
- Headings hierárquicos (H1, H2, H3)
- Alt text em todas as imagens
- URLs semânticas
- Conteúdo rico e relevante
- Internal linking

## 📱 Responsividade

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

## 🚀 Fases de Desenvolvimento

### Fase 1: Setup Inicial
- [ ] Inicializar projeto Next.js com TypeScript
- [ ] Configurar Tailwind CSS
- [ ] Estrutura de pastas
- [ ] Configuração básica de SEO
- [ ] Layout base (Header/Footer)

### Fase 2: Seções Principais
- [ ] Hero Section
- [ ] Sobre a Empresa
- [ ] Serviços/Produtos
- [ ] Galeria de Projetos

### Fase 3: Seções Secundárias
- [ ] Processo de Trabalho
- [ ] Diferenciais
- [ ] Depoimentos
- [ ] FAQ

### Fase 4: Formulário e Contato
- [ ] Formulário de contato
- [ ] Validação
- [ ] Integração (API/Email)

### Fase 5: Otimizações
- [ ] SEO completo (meta tags, schema)
- [ ] Performance (lazy loading, otimização de imagens)
- [ ] Animações e transições
- [ ] Testes de responsividade

### Fase 6: Polimento Final
- [ ] Ajustes de design
- [ ] Testes cross-browser
- [ ] Acessibilidade
- [ ] Analytics (Google Analytics)
- [ ] Deploy

## 📝 Próximos Passos

1. Revisar e aprovar o plano
2. Coletar conteúdo (textos, imagens, informações de contato)
3. Definir paleta de cores e identidade visual
4. Iniciar desenvolvimento seguindo as fases acima

## 🔗 Recursos Necessários

- Logo da Domus Italinea
- Imagens de projetos realizados
- Textos sobre a empresa
- Informações de contato (telefone, email, endereço)
- Redes sociais
- Depoimentos de clientes (se disponíveis)

---

**Nota**: Este plano é flexível e pode ser ajustado conforme feedback e necessidades específicas da Domus Italinea.
