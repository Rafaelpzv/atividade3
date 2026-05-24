require('dotenv').config();
const express = require('express');
const app = express();
const alunosRoutes = require('./routes/alunos');

const PORT = process.env.PORT || 3000;

app.get('/help', (req, res) => {
    const baseUrl = `http://localhost:${PORT}`;
    res.json({
        mensagem: "Bem-vindo à API Escola!",
        endpoints: [
            {
                metodo: "GET",
                endpoint: "/alunos",
                descricao: "Lista todos os alunos",
                exemplo: `${baseUrl}/alunos`
            },
            {
                metodo: "GET",
                endpoint: "/alunos/:ra",
                descricao: "Busca um aluno pelo RA",
                exemplo: `${baseUrl}/alunos/1`
            },
            {
                metodo: "GET",
                endpoint: "/alunos/:ra/disciplinas",
                descricao: "Lista todas as disciplinas de um aluno",
                exemplo: `${baseUrl}/alunos/1/disciplinas`
            },
            {
                metodo: "POST",
                endpoint: "/alunos",
                descricao: "Cria um novo aluno",
                exemplo: `${baseUrl}/alunos`,
                body: {
                    ra: "4",
                    nome: "Ana",
                    disciplinas: [
                        { codigo: "MAT101", nome: "Matemática", professor: "Prof. Carlos" }
                    ]
                }
            },
            {
                metodo: "PUT",
                endpoint: "/alunos/:ra",
                descricao: "Atualiza dados de um aluno (nome e/ou disciplinas)",
                exemplo: `${baseUrl}/alunos/1`,
                body: {
                    nome: "João Silva",
                    disciplinas: [
                        { codigo: "FIS101", nome: "Física", professor: "Prof. Maria" }
                    ]
                }
            },
            {
                metodo: "DELETE",
                endpoint: "/alunos/:ra",
                descricao: "Remove um aluno pelo RA",
                exemplo: `${baseUrl}/alunos/4`
            },
            {
                metodo: "GET",
                endpoint: "/help",
                descricao: "Mostra esta documentação",
                exemplo: `${baseUrl}/help`
            }
        ],
        dicas: [
            "Use ferramentas como Postman, Insomnia ou curl para testar.",
            "Todos os endpoints que exigem corpo (POST/PUT) devem enviar JSON com header Content-Type: application/json.",
            "O RA é uma string e pode conter números ou letras.",
            "As disciplinas devem ter os campos 'codigo', 'nome' e 'professor' preenchidos."
        ]
    });
});

app.get('/', (req, res) => {
    res.redirect('/help');
});

app.use(express.json());


app.use('/alunos', alunosRoutes);


app.use((req, res) => {
    res.status(404).json({ erro: `Rota "${req.method} ${req.path}" não existe.` });
});


app.listen(PORT, () => {
    console.log(`\nAPI Escola rodando em http://localhost:${PORT}`);
    console.log('\nEndpoints disponíveis:');
    console.log(`  GET    http://localhost:${PORT}/alunos`);
    console.log(`  GET    http://localhost:${PORT}/alunos/:ra`);
    console.log(`  GET    http://localhost:${PORT}/alunos/:ra/disciplinas`);
    console.log(`  POST   http://localhost:${PORT}/alunos`);
    console.log(`  PUT    http://localhost:${PORT}/alunos/:ra`);
    console.log(`  DELETE http://localhost:${PORT}/alunos/:ra\n`);
});
