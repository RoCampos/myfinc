# Guia de Configuração: Frontend (Flask + Inertia + Vite + React)

Este documento explica como as peças do seu projeto se encaixam e detalha as configurações essenciais para o ambiente de desenvolvimento moderno (Hot Reload).

## 1. Visão Geral da Arquitetura

O seu projeto é um híbrido:
*   **Backend (Flask)**: Servidor principal (Porta 5000). Renderiza o HTML inicial.
*   **Frontend (React + Vite)**: Servidor de desenvolvimento (Porta 5173) ou arquivos estáticos compilados.
*   **A "Cola" (Inertia.js)**: Conecta os dois usando JSON injetado no HTML.

> **ATENÇÃO CRÍTICA**: Esqueça a porta 5173 no navegador. Ela serve só como "cdn de arquivos" para o Flask. O seu site mora na porta 5000.


---

## 2. Fluxo de Trabalho Híbrido (Dev vs Prod)

Configuramos o projeto para ter o melhor dos dois mundos:

### Modo Desenvolvimento (Hot Reload) 🔥
Quando você roda o Flask em modo debug (`FLASK_DEBUG=1`) e o Vite (`npm run dev`):
1.  Você acessa `http://localhost:5000`.
2.  O Flask detecta o modo debug.
3.  O HTML carrega o JavaScript **diretamente do servidor do Vite** (`http://localhost:5173`).
4.  **Resultado**: Quando você salva um arquivo `.tsx`, a página atualiza instantaneamente.

### Modo Produção (Build) 📦
Quando você roda apenas o Flask (sem o Vite):
1.  O HTML carrega o JavaScript compilado da pasta `app/static/dist`.
2.  É necessário rodar `npm run build` antes para gerar esses arquivos.

---

## 3. Configurações Essenciais

### A. Vite (`vite.config.ts`)
Configurado para entender quando está servindo (dev) ou construindo (prod).

```typescript
export default defineConfig(({ command }) => ({
  // Em Dev ('serve') usa a raiz '/'. Em Prod ('build') usa '/dist' para ser encontrado pelo Flask.
  base: command === 'serve' ? '/' : '/dist',
  plugins: [react()],
  build: {
    outDir: '../dist', // Joga o build direto na pasta estática do Flask
    rollupOptions: {
      input: 'src/main.tsx',
    },
  }
  // ...
}))
```

### B. Flask Template (`app/templates/index.html`)
Lógica inteligente para escolher a fonte do script.

```html
<head>
    <!-- ... -->
    <script>
        {{ inertia.include_router() }}
    </script>
</head>
<body>
    <div id="app" data-page='{{ page | tojson }}'></div>

    {% if config['DEBUG'] %}
        <!-- MODO DEV: Conecta no Vite -->
        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <script type="module" src="http://localhost:5173/src/main.tsx"></script>
    {% else %}
        <!-- MODO PROD: Usa arquivos da pasta static -->
        <script type="module" src="{{ url_for('static', filename='dist/assets/main.js') }}"></script>
    {% endif %}
</body>
```

---

## 4. Como Rodar o Projeto

### Passo 1: Iniciar o Frontend (Terminal 1)
```bash
cd app/static/resources
npm run dev
# Vai rodar em http://localhost:5173 (deixe rodando)
```

### Passo 2: Iniciar o Backend (Terminal 2)
```bash
# Na raiz do projeto
# Certifique-se que o ambiente virtual está ativo
flask run --debug
# Vai rodar em http://localhost:5000
```

Acesse **`http://localhost:5000`**. Você verá sua aplicação Flask + Inertia com atualizações em tempo real do React!
