# Documentação da Configuração do Backend (Flask)

Este documento detalha as configurações implementadas para o backend da aplicação, utilizando o microframework **Flask**. As configurações são gerenciadas principalmente através de variáveis de ambiente e da estruturação do projeto em *"Blueprints"*.

## 1. Estrutura de Inicialização (`app/__init__.py`)

O arquivo `app/__init__.py` é responsável por criar e configurar a instância da aplicação Flask. Ele segue o padrão "Application Factory" (Fábrica de Aplicativos), o que facilita testes e extensibilidade.

### Componentes Chave:

*   **`load_dotenv()`**: Carrega as variáveis definidas no arquivo `.env` para o ambiente de execução, permitindo que sejam acessadas via `os.getenv`.
*   **`create_app()`**: Função que inicializa o app.
    *   **Configurações do App**:
        *   `SECRET_KEY`: Chave secreta usada pelo Flask para assinar sessões e tokens de segurança.
        *   `INERTIA_TEMPLATE`: Define qual arquivo HTML será usado como base para o frontend (Inertia.js).
    *   **Registro de Blueprints**:
        *   `inertia_bp`: Blueprint responsável pela integração com o Inertia.js (frontend).
        *   `testBP`: Blueprint de exemplo/teste (controlador).

```python
# Exemplo simplificado de app/__init__.py
def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['INERTIA_TEMPLATE'] = os.getenv('INERTIA_TEMPLATE')
    
    app.register_blueprint(inertia_bp)
    app.register_blueprint(testBP)
    return app
```

## 2. Ponto de Entrada (`run.py`)

O arquivo `run.py` é o script principal para executar o servidor de desenvolvimento.

*   Ele importa a função `create_app` da pasta `app`.
*   Executa o servidor com `app.run(debug=True)`, o que ativa o modo de debug (recarregamento automático e mensagens de erro detalhadas).

## 3. Variáveis de Ambiente (`.env`)

O arquivo `.env` (que não é versionado no Git por segurança) deve conter as configurações sensíveis e específicas do ambiente. Baseado no código, as variáveis esperadas são:

| Variável | Descrição | Exemplo de Valor |
| :--- | :--- | :--- |
| `SECRET_KEY` | String aleatória e segura para criptografia de sessões. | `uma_chave_muito_s ecreta_123` |
| `INERTIA_TEMPLATE` | Nome do arquivo de template HTML para o Inertia. | `index.html` |

## 4. Integração Frontend (Inertia.js)

A configuração do Inertia está isolada em um serviço (`app/services/inertia.py`).

*   Utiliza a extensão `flask_inertia`.
*   O `inertia_bp` é um *Blueprint* vazio usado apenas para inicializar a extensão no escopo correto durante o `create_app`.

---

## Resumo para Estudo

Para estudar este backend, foque em entender:
1.  Como o **`dotenv`** injeta configurações sem hardcodar senhas no código.
2.  Como o padrão **Factory (`create_app`)** permite criar múltiplas instâncias do app (útil para testes).
3.  O conceito de **Blueprints** do Flask como forma de modularizar rotas e lógicas (separando `inertia` e `controllers`).
