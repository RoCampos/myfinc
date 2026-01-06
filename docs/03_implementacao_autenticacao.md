# 03. Implementação da Autenticação (Estudo de Caso)

Este documento detalha o processo de implementação do sistema de login utilizando **Flask (Backend)** e **Inertia.js + React (Frontend)**. O objetivo é explicar não apenas o código, mas o *porquê* das escolhas arquiteturais.

## 1. O Problema: Comunicação Híbrida

Aplicativos usando **Inertia.js** são híbridos únicos. Eles funcionam:
- **Como SPA (Single Page Application)**: A navegação ocorre sem recarregar a página inteira.
- **Como Monolito Clássico**: O roteamento e controle de acesso (auth) continuam no servidor (Flask).

Isso cria um desafio: **Como mandar erros de validação (ex: "Senha incorreta") do Flask para o React sem usar APIs REST tradicionais?**

## 2. Solução Implementada

### A. Fluxo de Dados (Frontend)

No `LoginForm.tsx`, paramos de usar `useState` manual e adotamos os hooks do Inertia:

1.  **`useForm`**: Gerencia o estado do formulário automaticamente.
    *   *Benefício*: Lida com o loading (`processing`), erros de campo (`errors`) e envio (`post`) de forma integrada.
2.  **`usePage`**: Acessa dados globais compartilhados pelo servidor "via props".
    *   *Uso*: É aqui que lemos as **Flash Messages** (`flash.message`) enviadas pelo Flask.

```tsx
// Exemplo didático
const { flash } = usePage().props; // Pega mensagens globais
const { data, post, processing } = useForm(...); // Gerencia o form
```

### B. O Backend (Flask + Flask-Login)

Para autenticação, escolhemos **Flask-Login** em vez de JWT.
*   **Motivo**: Como o Inertia roda no navegador, cookies de sessão (HttpOnly) são mais seguros e fáceis de gerenciar que tokens manuais.

#### Configuração Global (`__init__.py`)
Criamos um "Hook" (`before_request`) para injetar mensagens em toda resposta do Inertia:

```python
@app.before_request
def share_flash_messages():
    # Lê a sessão do Flask e manda para o React
    messages = get_flashed_messages(with_categories=True)
    if messages:
        inertia.share('flash', {'message': message, 'category': category})
```

Isso resolve o problema do **Redirecionamento**. Quando o login falha, o Flask faz um redirect. A mensagem de erro sobrevive na sessão e é injetada na próxima página carregada pelo navegador.

### C. O Controller (`AuthController.py`)

A rota `/login` trata dois cenários:
1.  **GET**: Renderiza a página (`render_inertia`).
2.  **POST**: Processa os dados.
    *   Recebe JSON (pois o Inertia envia JSON).
    *   Se erro: Grava `flash` na sessão e redireciona de volta.
    *   Se sucesso: Loga o usuário (`login_user`) e redireciona ao Dashboard.

## 3. Diagrama do Fluxo de Erro

Quando o usuário erra a senha, acontece este ciclo invisível aos olhos:

![Fluxo de Erro](img/DiagramaFluxoErro.png)

1.  **React** envia POST `/login`.
2.  **Flask** valida -> Senha Inválida -> `flash("Erro")` -> Responde **302 Redirect**.
3.  **Navegador** recebe 302 -> Faz novo GET `/login`.
4.  **Flask (Before Request)** -> Pega "Erro" da sessão -> Injeta em `props.flash`.
5.  **React** renderiza a página de novo, agora com o alerta de erro visível.

## 4. Estilos (Tailwind CSS v4)

Atualizamos a configuração para o Tailwind v4 (beta/novo padrão).
- O arquivo `index.css` agora usa apenas `@import "tailwindcss";`.
- A mágica acontece no plugin `@tailwindcss/vite` dentro do `vite.config.ts`, que detecta as classes nos arquivos TSX e gera o CSS sob demanda.

## 5. Instalações Necessárias

Para habilitar essas funcionalidades, as seguintes bibliotecas foram integradas ao projeto:

### Backend (Python/Flask)

```bash
pip install flask-login flask-inertia
```
*   **flask-login**: Gerenciamento de sessão de usuário.
*   **flask-inertia**: Integração entre Flask e o protocolo Inertia.

### Frontend (Node.js/React)

```bash
npm install @headlessui/react @tailwindcss/vite
```
*   **@headlessui/react**: Componentes acessíveis e sem estilo (usados no Login).
*   **@tailwindcss/vite**: Plugin oficial para suporte ao Tailwind CSS v4.

---
**Resumo para Estudo**:
- **Inertia** conecta o Backend ao Frontend sem API REST.
- **Flask-Login** gerencia a sessão via Cookies.
- **Flash Messages** transportam erros através de redirecionamentos.
- **Middleware (before_request)** garante que o React sempre receba os dados globais.
