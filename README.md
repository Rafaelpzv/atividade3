# API Escola

API RESTful para gerenciamento de alunos e suas disciplinas, desenvolvida com **Node.js**, **Express** e **MongoDB**, organizada em camadas (MVC).

---

## Tecnologias

- Node.js — runtime JavaScript
- Express — framework HTTP
- MongoDB Driver — conexão com o banco de dados
- dotenv — gerenciamento de variáveis de ambiente

---

## Estrutura do projeto

```txt
escola-api/
├── controllers/
│   └── alunoController.js
├── routes/
│   └── alunos.js
├── models/
│   └── alunoModel.js
├── server.js
├── .env
├── .gitignore
└── package.json
```

---

## Como executar

### Pré-requisitos

- Node.js 14 ou superior
- MongoDB local ou MongoDB Atlas

---

### Instalação

```bash
npm install
```

---

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-banco>
```

#### MongoDB local

```env
MONGO_URI=mongodb://localhost:27017/escola
```

---

### Iniciar servidor

```bash
npm start
```

Servidor disponível em:

```txt
http://localhost:3000
```

---

## Endpoints

| Método | Rota                      | Descrição                        |
| ------- | ------------------------- | -------------------------------- |
| GET     | `/alunos`                 | Lista todos os alunos            |
| GET     | `/alunos/:ra`             | Busca um aluno pelo RA           |
| GET     | `/alunos/:ra/disciplinas` | Lista disciplinas de um aluno    |
| POST    | `/alunos`                 | Cria um novo aluno               |
| PUT     | `/alunos/:ra`             | Atualiza dados de um aluno       |
| DELETE  | `/alunos/:ra`             | Remove um aluno                  |

---

## Exemplos de uso

### Listar alunos

```bash
curl http://localhost:3000/alunos
```

---

### Buscar aluno por RA

```bash
curl http://localhost:3000/alunos/1
```

---

### Listar disciplinas

```bash
curl http://localhost:3000/alunos/1/disciplinas
```

---

### Criar aluno

```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{
    "ra": "4",
    "nome": "Ana",
    "disciplinas": [
      {
        "codigo": "MAT101",
        "nome": "Matemática",
        "professor": "Prof. Carlos"
      }
    ]
  }'
```

> O campo `disciplinas` é opcional.

---

### Atualizar aluno

```bash
curl -X PUT http://localhost:3000/alunos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva"
  }'
```

---

### Deletar aluno

```bash
curl -X DELETE http://localhost:3000/alunos/4
```

---

## Respostas da API

### 200 — Sucesso

```json
{
  "mensagem": "Aluno atualizado com sucesso.",
  "aluno": {
    "ra": "1",
    "nome": "João Silva",
    "disciplinas": []
  }
}
```

---

### 201 — Criado

```json
{
  "mensagem": "Aluno criado com sucesso.",
  "aluno": {
    "ra": "4",
    "nome": "Ana",
    "disciplinas": []
  }
}
```

---

### 400 — Dados inválidos

```json
{
  "erro": "Dados inválidos."
}
```

---

### 404 — Não encontrado

```json
{
  "erro": "Aluno não encontrado."
}
```

---

### 409 — Conflito

```json
{
  "erro": "Já existe um aluno com este RA."
}
```

---

## Validações

- `ra` e `nome` são obrigatórios
- `ra` deve ser único
- `disciplinas` deve ser um array
- Cada disciplina deve conter:
  - `codigo`
  - `nome`
  - `professor`
- O campo `ra` não pode ser alterado
- `PUT` sem body retorna `400`

---

## Persistência

Os dados são armazenados no MongoDB utilizando a variável `MONGO_URI` definida no `.env`.

Os dados permanecem salvos mesmo após reiniciar o servidor.
