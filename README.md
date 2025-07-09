# NLW Agents - Let me Ask

Aplicação web desenvolvida durante o evento **NLW Agents** da [Rocketseat](https://rocketseat.com.br), focada em criar uma plataforma para criação e gerenciamento de salas de Q&A (perguntas e respostas).

## 🚀 Tecnologias

Este projeto foi construído com as seguintes tecnologias:

### Core
- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Bundler e ferramenta de desenvolvimento rápida

### Estilização
- **Tailwind CSS 4** - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis e sem estilo

### Estado e Roteamento
- **TanStack Query (React Query)** - Gerenciamento de estado server-side
- **React Router DOM** - Roteamento SPA

### Utilitários
- **Lucide React** - Biblioteca de ícones

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── ui/
│       └── button.tsx      # Componente Button reutilizável
├── lib/
│   └── utils.ts           # Utilitários (função cn)
├── pages/
│   ├── create-room.tsx    # Página de listagem/criação de salas
│   └── room.tsx           # Página de detalhes da sala
├── app.tsx                # Componente principal com roteamento
├── main.tsx               # Ponto de entrada da aplicação
└── index.css              # Estilos globais e tema
```

## 🛠️ Padrões de Projeto

### Arquitetura
- **Component-Based Architecture** com React
- **Page-based Routing** usando React Router
- **Compound Component Pattern** para componentes UI

### Organização de Código
- **Barrel Exports** para componentes
- **Type-safe Props** com TypeScript
- **Path Mapping** (`@/*`) para imports absolutos
- **CSS-in-CSS** com Tailwind CSS

### Gerenciamento de Estado
- **Server State** gerenciado com TanStack Query
- **Client State** usando React hooks nativos

## ⚙️ Configuração e Setup

### Pré-requisitos
- Node.js (versão 18+)
- npm, yarn ou pnpm

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd web
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure o arquivo `.env` (se necessário):
```bash
# Adicione variáveis de ambiente se houver
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Backend
A aplicação espera uma API rodando em `http://localhost:3333` com os seguintes endpoints:
- `GET /rooms` - Lista todas as salas

## 🎨 Componentes UI

O projeto utiliza um sistema de componentes baseado no **shadcn/ui** com:
- Variantes customizáveis com `class-variance-authority`
- Tema escuro/claro configurado via CSS variables
- Componentes acessíveis com Radix UI

### Exemplo de uso:
```tsx
import { Button } from "@/components/ui/button"

<Button variant="outline" size="lg">
  Meu Botão
</Button>
```

## 📋 Funcionalidades

- ✅ Listagem de salas disponíveis
- ✅ Navegação entre páginas
- ✅ Interface responsiva
- ✅ Tema escuro/claro
- ✅ Componentes reutilizáveis

---

Desenvolvido com 💜 durante o **NLW Agents** da **Rocketseat**
