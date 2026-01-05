# Guia de Configuração: Banco de Dados (PostgreSQL + Docker + SQLAlchemy)

Este documento detalha como o banco de dados foi integrado ao projeto `financas`. A arquitetura escolhida utiliza **PostgreSQL** rodando em **Docker**, gerenciado pelo **SQLAlchemy** no Flask.

---

## 1. A Infraestrutura (Docker)

Não instalamos o PostgreSQL diretamente no Windows. Usamos o **Docker** para criar um ambiente isolado e limpo.

### Arquivo: `docker-compose.yml`
Este arquivo define o "serviço" de banco de dados.

*   **Image**: Usamos `postgres:15-alpine`. "Alpine" indica uma versão super leve do Linux, ideal para economizar espaço e memória.
*   **Ports (`5432:5432`)**: Abre a porta padrão do Postgres para que seu computador (localhost) consiga conversar com o container.
*   **Volumes (`postgres_data`)**: **Crucial**. Mapeia uma pasta para salvar os dados. Sem isso, toda vez que você desligasse o Docker, perderia todas as tabelas e usuários.
*   **Environment**: Define usuário, senha e nome do banco automaticamente na criação do container.

> **Comando de Controle**:
> *   `docker compose up -d`: Sobe o banco em segundo plano.
> *   `docker compose stop`: Para o banco.

---

## 2. A Conexão (Flask + SQLAlchemy)

O Flask precisa de uma "ponte" para falar com o banco de dados.

### Arquivo: `app/services/database.py`
Aqui criamos a **Engine** (o motor da conexão).

*   **Variáveis de Ambiente**: Usamos `os.getenv('POSTGRES_USER')` para não deixar senhas escritas no código (Hardcoded). Elas vêm do arquivo `.env`.
*   **String de Conexão**: Montamos a URL que o motor usa:
    `postgresql+psycopg://usuario:senha@localhost:5432/banco`
*   **Session**: A função `get_connection()` entrega uma "sessão". Pense na sessão como uma "aba aberta" no banco onde você faz consultas e depois fecha.

---

## 3. Os Modelos (ORM)

Em vez de escrever SQL manual (`CREATE TABLE...`), escrevemos classes Python. O **SQLAlchemy** traduz essas classes para tabelas reais.

### Arquivo: `app/models/__init__.py` (A Base)
Define a classe `Base`. Todos os nossos modelos herdam dela. É como se ela fosse um "registro" que anota todas as tabelas que criamos.
> **Importante**: Este arquivo também importa os modelos individuais (ex: `from .user import User`). Sem isso, o sistema não "enxerga" que o User existe.

### Arquivo: `app/models/user.py` (Exemplo de Tabela)
Define a tabela `users`.
*   **Mapped[...]**: É a forma moderna (SQLAlchemy 2.0) de dizer o tipo do dado (`int`, `str`).
*   **mapped_column**: Define detalhes banco, como `primary_key=True` ou se permite nulo.

---

## 4. A Inicialização (Auto-Migration)

Como as tabelas são criadas de verdade no Postgres?

### Arquivo: `app/__init__.py`
Quando o Flask inicia (`create_app`), executamos:

```python
Base.metadata.create_all(bind=sync_engine)
```

Essa linha mágica faz o seguinte:
1.  Olha para a `Base`.
2.  Vê quais modelos estão registrados (ex: `User`).
3.  Vai no banco de dados e verifica: "A tabela `users` existe?".
4.  Se não existir, ele executa o `CREATE TABLE` automaticamente.

---

## Resumo do Fluxo

1.  **Docker** sobe o servidor Postgres.
2.  **Flask** inicia e lê as credenciais do `.env`.
3.  **SQLAlchemy** conecta no Postgres via `database.py`.
4.  **Flask** chama `create_all()`.
5.  **SQLAlchemy** lê a classe `User` e cria a tabela `users` no Docker.
6.  Pronto! O sistema está apto a salvar dados.
