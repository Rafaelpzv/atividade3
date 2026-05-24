// services/alunoService.js
const alunosData = require('../data/alunosData');

// ----- Funções auxiliares (síncronas) -----
function isDisciplinaValida(disciplina) {
    return (
        disciplina &&
        typeof disciplina.codigo === 'string' && disciplina.codigo.trim() !== '' &&
        typeof disciplina.nome === 'string' && disciplina.nome.trim() !== '' &&
        typeof disciplina.professor === 'string' && disciplina.professor.trim() !== ''
    );
}

function findCodigoDuplicado(disciplinas) {
    const codigos = disciplinas.map(d => d.codigo.trim().toUpperCase());
    return codigos.find((codigo, index) => codigos.indexOf(codigo) !== index) || null;
}

function sanitizeDisciplina(disciplina) {
    return {
        codigo: disciplina.codigo.trim().toUpperCase(),
        nome: disciplina.nome.trim(),
        professor: disciplina.professor.trim()
    };
}

// ----- Serviços (assíncronos) -----
async function listarAlunos() {
    return await alunosData.getAll();
}

async function buscarAlunoPorRa(ra) {
    const aluno = await alunosData.findByRa(ra);
    if (!aluno) {
        throw new Error(`Aluno com RA ${ra} não encontrado.`);
    }
    return aluno;
}

async function listarDisciplinas(ra) {
    const aluno = await buscarAlunoPorRa(ra);
    return aluno.disciplinas;
}

async function criarAluno(novoAluno) {
    const { ra, nome, disciplinas } = novoAluno;

    // Validações síncronas
    if (!ra || typeof ra !== 'string' || ra.trim() === '') {
        throw new Error('O campo "ra" é obrigatório e deve ser uma string não vazia.');
    }
    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        throw new Error('O campo "nome" é obrigatório e deve ser uma string não vazia.');
    }

    // Verifica se RA já existe (assíncrono)
    const existe = await alunosData.findByRa(ra);
    if (existe) {
        throw new Error(`Já existe um aluno com o RA ${ra}.`);
    }

    let disciplinasValidada = [];
    if (disciplinas && Array.isArray(disciplinas)) {
        const invalida = disciplinas.find(d => !isDisciplinaValida(d));
        if (invalida) {
            throw new Error('Cada disciplina deve conter os campos "codigo", "nome" e "professor" preenchidos.');
        }
        const duplicado = findCodigoDuplicado(disciplinas);
        if (duplicado) {
            throw new Error(`Código de disciplina duplicado encontrado: "${duplicado}".`);
        }
        disciplinasValidada = disciplinas.map(sanitizeDisciplina);
    } else if (disciplinas !== undefined && !Array.isArray(disciplinas)) {
        throw new Error('O campo "disciplinas" deve ser um array.');
    }

    const aluno = {
        ra: ra.trim(),
        nome: nome.trim(),
        disciplinas: disciplinasValidada
    };

    return await alunosData.insert(aluno);
}

async function atualizarAluno(ra, dadosAtualizacao) {
    const { nome, disciplinas } = dadosAtualizacao;

    // Verifica se o aluno existe (assíncrono)
    const existe = await alunosData.findByRa(ra);
    if (!existe) {
        throw new Error(`Aluno com RA ${ra} não encontrado.`);
    }

    const atualizacao = {};

    if (nome !== undefined) {
        if (typeof nome !== 'string' || nome.trim() === '') {
            throw new Error('O campo "nome" deve ser uma string não vazia.');
        }
        atualizacao.nome = nome.trim();
    }

    if (disciplinas !== undefined) {
        if (!Array.isArray(disciplinas)) {
            throw new Error('O campo "disciplinas" deve ser um array.');
        }
        const invalida = disciplinas.find(d => !isDisciplinaValida(d));
        if (invalida) {
            throw new Error('Cada disciplina deve conter os campos "codigo", "nome" e "professor" preenchidos.');
        }
        const duplicado = findCodigoDuplicado(disciplinas);
        if (duplicado) {
            throw new Error(`Código de disciplina duplicado encontrado: "${duplicado}".`);
        }
        atualizacao.disciplinas = disciplinas.map(sanitizeDisciplina);
    }

    if (Object.keys(atualizacao).length === 0) {
        throw new Error('Nenhum campo para atualizar foi fornecido. Envie "nome" e/ou "disciplinas".');
    }

    return await alunosData.update(ra, atualizacao);
}

async function deletarAluno(ra) {
    const alunoRemovido = await alunosData.remove(ra);
    if (!alunoRemovido) {
        throw new Error(`Aluno com RA ${ra} não encontrado.`);
    }
    return alunoRemovido;
}

module.exports = {
    listarAlunos,
    buscarAlunoPorRa,
    listarDisciplinas,
    criarAluno,
    atualizarAluno,
    deletarAluno
};
