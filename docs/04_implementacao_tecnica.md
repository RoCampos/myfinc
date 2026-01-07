# Documentação Técnica: Implementação do Módulo de Autenticação - App Finanças

## 1. Visão Geral da Arquitetura
O projeto utiliza uma arquitetura híbrida moderna ("Monólito Majestoso") combinando a robustez do **Flask** (Python) no backend com a interatividade do **React** no frontend, unidos pelo **Inertia.js**.

- **Backend (Flask):** Gerencia rotas, banco de dados (SQLAlchemy) e lógica de negócios.
- **Frontend (React + Vite):** Renderiza a interface do usuário como uma SPA (Single Page Application), mas com roteamento controlado pelo servidor.
- **Inertia.js:** Atua como a "cola", permitindo retornar views React diretamente dos controllers Flask sem a necessidade de uma API REST completa para renderização de páginas.

## 2. Implementação da Autenticação

### 2.1 Backend (Controller)
O `AuthController.py` gerencia o fluxo de entrada e saída.

*   **Flash Messages:** Utilizamos o sistema nativo de `flash` do Flask para enviar feedback (sucesso/erro) para o frontend.
    *   Exemplo: `flash('User not found', 'error')`
    *   O Inertia transporta essas mensagens automaticamente através das `props` globais da página.

### 2.2 Frontend (Regra de Negócio)

#### Gerenciamento de Formulário (`AuthForm.tsx`)
Centralizamos a lógica de Login e Registro em um único componente `AuthForm` que muda de comportamento baseado na prop `action` (`/login` ou `/register`).

**Destaque da Implementação: Feedback Reativo**
Para melhorar a UX, implementamos um sistema onde a mensagem de erro desaparece assim que o usuário interage com o formulário, evitando que erros antigos persistam na tela.

```typescript
// Lógica de Sincronização e Limpeza de Erros
const { flash } = usePage().props as any;
const [visibleError, setVisibleError] = useState<string | null>(null);

// 1. Sincroniza: Quando o backend manda um erro, atualizamos o estado local
useEffect(() => {
    if (flash?.message) setVisibleError(flash.message);
}, [flash]);

// 2. Limpa na Navegação: Ao trocar de Login para Registro, removemos o erro
useEffect(() => {
    setVisibleError(null);
}, [action]);

// 3. Limpa na Interação: Ao focar no input, o erro some
const clearError = () => setVisibleError(null);
```

### 3. Componentização e Interface (UI/UX)

#### Layout e Estrutura
- **`AuthLayout`**: Wrapper principal que centraliza o conteúdo na tela com o fundo temático (`bg-finance-bg`).
- **`SplitShell`**: Componente visual que divide a tela (ou o card) em áreas de conteúdo e imagem/decoração.
- **`AuthTab`**: Utiliza `@headlessui/react` para criar uma navegação suave entre as abas de "Entrar" e "Cadastrar" sem recarregar a página ou perder o contexto visual.

#### Componentes Reutilizáveis
- **`Input.tsx`**: Um wrapper personalizado sobre o input HTML.
    - *Melhoria Recente:* Adicionado suporte à prop `onFocus` para permitir a limpeza de erros mencionada acima.
    - Estilização condicional baseada em data-attributes para foco e estados.

## 4. Estilização (Tailwind CSS v4)
O projeto utiliza a versão **Tailwind CSS v4**, que traz uma mudança significativa na arquitetura de configuração. Em vez de um arquivo JavaScript separado, os tokens do tema personalizado (`finance`) são definidos diretamente no arquivo **`index.css`** utilizando variáveis CSS nativas.

Essa abordagem moderna simplifica o build e mantém a estilização mais próxima do CSS padrão. Continuamos evitando cores *hardcoded*, preferindo tokens semânticos:
- `bg-finance-bg`: Cor de fundo da aplicação.
- `text-finance-ink`: Cor principal de texto.
- `border-finance-border`: Cor de bordas sutis.

---
*Documento gerado automaticamente pela Assistente Antigravity em 07/01/2026.*
