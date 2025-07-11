# 🎯 NLW Agents - Let me Ask

<div align="center">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.0.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1.11-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</div>

<br>

<p align="center">
  <strong>Plataforma inteligente de Q&A com IA integrada</strong><br>
  Desenvolvida durante o evento <strong>NLW Agents</strong> da <a href="https://rocketseat.com.br">Rocketseat</a>
</p>

## 🚀 Sobre o Projeto

Uma aplicação web moderna para criação e gerenciamento de **salas de perguntas e respostas** com:
- **Gravação de áudio** em tempo real com timer visual
- **Respostas geradas por IA** para perguntas dos usuários
- **Interface responsiva** com tema escuro nativo
- **Navegação fluida** entre salas e funcionalidades

## 🛠️ Stack Tecnológica

### **Frontend Framework**
- **React 19** - Framework com novas funcionalidades de concorrência
- **TypeScript 5.8** - Tipagem estática avançada
- **Vite 7** - Build tool ultra-rápida com HMR

### **Estilização & UI**
- **Tailwind CSS 4** - Framework utility-first com performance otimizada
- **Radix UI** - Componentes acessíveis headless
- **Lucide React** - Ícones SVG otimizados
- **class-variance-authority** - Sistema de variantes tipado

### **Estado & Data Fetching**
- **TanStack Query v5** - Cache inteligente e sincronização server-state
- **React Hook Form** - Gerenciamento de formulários performático
- **Zod v4** - Validação de schemas com inferência de tipos

### **Roteamento & Navegação**
- **React Router DOM v7** - Roteamento SPA com lazy loading

### **Utilidades & Qualidade**
- **Day.js** - Manipulação de datas com i18n (pt-BR)
- **clsx + tailwind-merge** - Merge condicional de classes CSS

## 📐 Arquitetura & Padrões

### **Design Patterns**
- **Compound Components** - Componentes compostos para UI flexível
- **Custom Hooks** - Lógica reutilizável e isolada
- **Optimistic Updates** - Atualizações instantâneas com rollback
- **Error Boundaries** - Tratamento robusto de erros

### **Code Organization**
```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Design System components
│   └── feature/        # Componentes específicos
├── pages/              # Páginas da aplicação
├── http/               # API hooks e types
├── lib/                # Utilitários e configurações
└── utils/              # Funções auxiliares
```

### **Type Safety**
- **100% TypeScript** com strict mode
- **API Response Types** - Contratos de dados tipados
- **Component Props** - Props interface bem definidas
- **Path Mapping** - Imports absolutos com `@/*`

## ✨ Funcionalidades Principais

### 🎙️ **Gravação de Áudio**
- Gravação contínua com chunks de 10s
- Timer visual em tempo real (HH:MM:SS)
- Upload automático para processamento IA
- Controles intuitivos de start/stop

### 🤖 **IA Integrada**
- Geração de respostas contextuais
- Loading states com feedback visual
- Fallback para erros de conexão

### 📱 **Interface Responsiva**
- Design mobile-first
- Tema escuro nativo
- Animações suaves com `tw-animate-css`
- Componentes acessíveis (WCAG 2.1)

## ⚡ Quick Start

### **Pré-requisitos**
```bash
Node.js 18+ | npm/yarn/pnpm
```

### **Instalação**
```bash
# Clone o repositório
git clone <repository-url>
cd web

# Instale dependências
npm install

# Inicie o desenvolvimento
npm run dev
```

### **Scripts Disponíveis**
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build otimizada para produção
npm run preview  # Preview da build local
```

### **Backend Requirements**
A aplicação requer uma API REST em `http://localhost:3333`:

```typescript
// Endpoints esperados
GET    /rooms                     # Lista salas
POST   /rooms                     # Criar sala
GET    /rooms/:id/questions       # Perguntas da sala
POST   /rooms/:id/questions       # Nova pergunta
POST   /rooms/:id/audio          # Upload áudio
```

## 🎨 Design System

### **Component Example**
```tsx
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

<Button variant="outline" size="lg">
  <Radio className="size-4" />
  Gravar Áudio
</Button>

<Badge variant="secondary">
  {formatTime(recordingTime)}
</Badge>
```

### **Theme Customization**
```css
:root {
  --radius: 0.625rem;
  --primary: oklch(0.21 0.006 285.885);
  --background: oklch(0.141 0.005 285.823);
}
```

## 📊 Performance Features

- **Code Splitting** automático por rotas
- **Lazy Loading** de componentes pesados
- **Query Caching** inteligente com TanStack Query
- **Optimistic UI** para melhor UX
- **Bundle Optimization** com Vite

## 🔧 Configuração Avançada

### **TypeScript Config**
```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### **Tailwind Config**
```javascript
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite"
      }
    }
  }
}
```

---

<div align="center">
  <p>
    <strong>Desenvolvido com 💜 durante o NLW Agents da Rocketseat</strong>
  </p>
  
  <p>
    <em>Demonstrando expertise em React 19, TypeScript, e arquitetura moderna de frontend</em>
  </p>