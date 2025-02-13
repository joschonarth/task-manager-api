# 📝 Task Manager API

Este projeto é uma **API REST** para gerenciamento de tarefas (tasks). Ele permite criar, listar, atualizar, remover, marcar como completa e importar tarefas em massa através de um arquivo CSV.

## 🛠️ Tecnologias Utilizadas

- 🟢 **Node.js**: Plataforma para execução do JavaScript no servidor.
- 🟦 **TypeScript**: Superset do JavaScript com tipagem estática.
- ⚡ **Fastify**: Framework web de alta performance para Node.js.
- 🗄️ **SQLite3**: Banco de dados leve e embutido para desenvolvimento.
- 📜 **Knex.js**: Query builder para interação com o banco de dados.
- 🔑 **Dotenv**: Gerenciamento de variáveis de ambiente.
- 💎 **Zod**: Validação de esquemas e dados.
- ✨ **ESLint**: Linter para garantir a qualidade do código.
- 📂 **@fastify/multipart**: Plugin para lidar com uploads de arquivos no Fastify.
- 📊 **fast-csv**: Biblioteca para processamento de arquivos CSV.

## ⚙️ Funcionalidades

- ➕ **Criar uma tarefa**: Permite registrar novas tarefas.
- 📄 **Listar todas as tarefas**: Retorna todas as tarefas armazenadas.
- ✏️ **Atualizar uma tarefa**: Altera os dados de uma tarefa específica.
- ❌ **Remover uma tarefa**: Deleta uma tarefa existente.
- ✅ **Marcar uma tarefa como completa**: Atualiza o status da tarefa.
- 📥 **Importar tarefas em massa**: Permite importar tarefas a partir de um arquivo CSV.

## 🔧 Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/joschonarth/task-manager-api.git
    cd task-manager-api
    ```

2. **Crie um arquivo `.env` a partir do exemplo:**

    ```bash
    cp .env.example .env
    ```

    Edite o arquivo `.env` para configurar as variáveis de ambiente necessárias.

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Execute as migrações do banco de dados:**

    ```bash
    npm run knex migrate:latest
    ```

5. **Inicie a aplicação:**

    ```bash
    npm run dev
    ```

    A API estará disponível em `http://localhost:3333`.

## 🔗 Endpoints

### ➕ Criar uma Task

- **Método**: `POST`
- **URL**: `/tasks`
- **Corpo da Requisição:**

    ```json
    {
        "title": "Título da Task",
        "description": "Descrição detalhada da Task"
    }
    ```

### 📄 Listar Tasks

- **Método**: `GET`
- **URL**: `/tasks`
- **Resposta:**

    ```json
    {
        "tasks": [
            {
                "id": "1",
                "title": "Título da Task",
                "description": "Descrição da Task",
                "created_at": "2025-02-12T12:00:00",
                "updated_at": "2025-02-12T12:10:00",
                "completed_at": null
            }
        ]
    }
    ```

### ✏️ Atualizar uma Task

- **Método**: `PUT`
- **URL**: `/tasks/:id`
- **Corpo da Requisição:**

    ```json
    {
        "title": "Novo Título"
    }
    ```

- **Resposta:**

    ```json
    {
        "id": "1",
        "title": "Novo Título",
        "description": "Descrição da Task",
        "created_at": "2025-02-12T12:00:00",
        "updated_at": "2025-02-12T12:20:00",
        "completed_at": null
    }
    ```

### ❌ Remover uma Task

- **Método**: `DELETE`
- **URL**: `/tasks/:id`
- **Resposta:**

    ```json
    {
        "message": "Task removed successfully"
    }
    ```

### ✅ Marcar uma Task como Completa

- **Método**: `PATCH`
- **URL**: `/tasks/:id/complete`
- **Resposta:**

    ```json
    {
        "id": "1",
        "title": "Título da Task",
        "description": "Descrição da Task",
        "created_at": "2025-02-12T12:00:00",
        "updated_at": "2025-02-12T12:10:00",
        "completed_at": "2025-02-12T12:00:00"
    }
    ```

### 📥 Importar Tasks

- **Método**: `POST`
- **URL**: `/tasks/import`
- **Corpo da Requisição**: Arquivo CSV com as colunas `title` e `description`.

    **Exemplo de CSV:**
    ```csv
    title,description
    Task 01,Descrição da Task 01
    Task 02,Descrição da Task 02
    Task 03,Descrição da Task 03
    Task 04,Descrição da Task 04
    Task 05,Descrição da Task 05
    ```

- **Resposta:**

    ```json
    {
        "message": "Tasks imported successfully"
    }
    ```

## 📥 Importação de Tasks via CSV

A API permite importar tasks em massa através de um arquivo CSV. Para realizar a importação, envie o arquivo usando o método `POST` na rota `/tasks/import`, com o arquivo sendo enviado no formato `multipart/form-data`.

Enviando o arquivo CSV com **Postman**:

1. Abra o Postman e selecione o método `POST`.
2. Na URL, insira `http://localhost:3333/tasks/import`.
3. Selecione a aba `Body`.
4. Selecione a opção `form-data`.
5. Adicione um campo com o nome `file` e escolha o tipo **File**.
6. Clique em **Select Files** e escolha um arquivo `.csv` (você pode utilizar o arquivo de exemplo [`test.csv`](./test.csv)).
7. Clique em **Send** para enviar a requisição.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests com melhorias ou correções. 🚀

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📞 Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joschonarth/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joschonarth@gmail.com)
