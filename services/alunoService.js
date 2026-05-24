const alunosData = require('../data/alunosData');

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

function listarAlunos() {
    return alunosData.getAll();
}

function buscarAlunoPorRa(ra) {
    const aluno = alunosData.findByRa(ra);
    if (!aluno) throw new Error(`Aluno com RA ${ra} não encontrado.`);
    return aluno;
}

function listarDisciplinas(ra) {
    const aluno = buscarAlunoPorRa(ra);
    return aluno.disciplinas;
}

function criarAluno(novoAluno) {
    const { ra, nome, disciplinas } = novoAluno;

   if (!ra || typeof ra !== 'string' || ra.trim() === '') {
        throw new Error('O campo "ra" é obrigatório e deve ser uma string não vazia.');
    }
    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        throw new Error('O campo "nome" é obrigatório e deve ser uma string não vazia.');
    }
    if (alunosData.findByRa(ra)) {
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

    return alunosData.insert(aluno);
}

function atualizarAluno(ra, dadosAtualizacao) {
    const { nome, disciplinas } = dadosAtualizacao;
    const index = alunosData.findIndexByRa(ra);
    if (index === -1) throw new Error(`Aluno com RA ${ra} não encontrado.`);

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

    return alunosData.update(index, atualizacao);
}

function deletarAluno(ra) {
    const index = alunosData.findIndexByRa(ra);
    if (index === -1) throw new Error(`Aluno com RA ${ra} não encontrado.`);
    return alunosData.remove(index);
}

module.exports = {
    listarAlunos,
    buscarAlunoPorRa,
    listarDisciplinas,
    criarAluno,
    atualizarAluno,
    deletarAluno
};
