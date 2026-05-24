# API Escola

API RESTful para gerenciamento de alunos e suas disciplinas, desenvolvida com **Node.js** e **Express**, organizada em camadas (MVC).

---

## Tecnologias

- [Node.js](https://nodejs.org/) — runtime JavaScript
- [Express](https://expressjs.com/) — framework HTTP
- [dotenv](https://github.com/motdotla/dotenv) — variáveis de ambiente

---

## Estrutura do projeto

```
escola-api/
├── data/
│   └── alunos.js           # dados em memória
├── controllers/
│   └── alunoController.js  # lógica de negócio e validações
├── routes/
│   └── alunos.js           # definição dos endpoints
├── server.js               # configuração do Express
├── .env                    # variáveis de ambiente (não commitar)
├── .gitignore
└── package.json
```

---

## Como executar

**Pré-requisito:** Node.js 14 ou superior.

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor
npm start
```

O servidor estará disponível em `http://localhost:3000`.

> A porta pode ser alterada no arquivo `.env`:
> ```env
> PORT=3000
> NODE_ENV=development
> ```

---

## Endpoints

| Método   | Rota                      | Descrição                          |
|----------|---------------------------|------------------------------------|
| `GET`    | `/alunos`                 | Lista todos os alunos              |
| `GET`    | `/alunos/:ra`             | Busca um aluno pelo RA             |
| `GET`    | `/alunos/:ra/disciplinas` | Lista as disciplinas de um aluno   |
| `POST`   | `/alunos`                 | Cria um novo aluno                 |
| `PUT`    | `/alunos/:ra`             | Atualiza dados de um aluno         |
| `DELETE` | `/alunos/:ra`             | Remove um aluno                    |

---

## Exemplos de uso

### Listar todos os alunos
```bash
curl http://localhost:3000/alunos
```

### Buscar aluno por RA
```bash
curl http://localhost:3000/alunos/1
```

### Listar disciplinas de um aluno
```bash
curl http://localhost:3000/alunos/1/disciplinas
```

### Criar um novo aluno
```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{
    "ra": "4",
    "nome": "Ana",
    "disciplinas": [
      { "codigo": "MAT101", "nome": "Matemática", "professor": "Prof. Carlos" }
    ]
  }'
```

> O campo `disciplinas` é opcional na criação (padrão: `[]`).

### Atualizar dados de um aluno
```bash
# Atualizar apenas o nome
curl -X PUT http://localhost:3000/alunos/1 \
  -H "Content-Type: application/json" \
  -d '{ "nome": "João Silva" }'

# Atualizar nome e disciplinas
curl -X PUT http://localhost:3000/alunos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "disciplinas": [
      { "codigo": "FIS101", "nome": "Física", "professor": "Prof. Maria" }
    ]
  }'
```

> O campo `ra` é **imutável** e não pode ser alterado.  
> A atualização é **parcial**: envie apenas os campos que deseja modificar.

### Deletar um aluno
```bash
curl -X DELETE http://localhost:3000/alunos/4
```

---

## Respostas da API

### Sucesso — 200
```json
{
  "mensagem": "Aluno com RA 1 atualizado com sucesso.",
  "aluno": {
    "ra": "1",
    "nome": "João Silva",
    "disciplinas": []
  }
}
```

### Criado — 201
```json
{
  "mensagem": "Aluno criado com sucesso.",
  "aluno": { "ra": "4", "nome": "Ana", "disciplinas": [] }
}
```

### Não encontrado — 404
```json
{
  "erro": "Aluno com RA 99 não encontrado."
}
```

### Conflito — 409
```json
{
  "erro": "Já existe um aluno cadastrado com o RA 4."
}
```

### Dados inválidos — 400
```json
{
  "erro": "Cada disciplina deve conter os campos \"codigo\", \"nome\" e \"professor\" preenchidos."
}
```

---

## Validações

- `ra` e `nome` são obrigatórios na criação e devem ser strings não vazias
- `ra` deve ser único — tentativa de duplicata retorna `409 Conflict`
- `disciplinas` deve ser um array; cada item precisa de `codigo`, `nome` e `professor`
- Códigos de disciplina duplicados no mesmo aluno não são permitidos
- Campos de texto recebem `trim()` automaticamente; `codigo` é normalizado para maiúsculas
- `PUT` sem nenhum campo no body retorna `400`

---

## Observação sobre persistência

Os dados são mantidos **em memória**. Ao reiniciar o servidor, o estado volta ao inicial definido em `data/alunos.js`. Para persistência real, integre um banco de dados como MongoDB ou PostgreSQL.
