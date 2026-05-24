const alunoService = require('../services/alunoService');

const listar = async (req, res) => {
    try {
        const alunos = await alunoService.listarAlunos();
        res.status(200).json(alunos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

const buscarPorRa = async (req, res) => {
    try {
        const { ra } = req.params;
        const aluno = await alunoService.buscarAlunoPorRa(ra);
        res.status(200).json(aluno);
    } catch (err) {
        res.status(404).json({ erro: err.message });
    }
};

const listarDisciplinas = async (req, res) => {
    try {
        const { ra } = req.params;
        const disciplinas = await alunoService.listarDisciplinas(ra);
        res.status(200).json(disciplinas);
    } catch (err) {
        res.status(404).json({ erro: err.message });
    }
};

const criar = async (req, res) => {
    try {
        const novoAluno = req.body;
        const alunoCriado = await alunoService.criarAluno(novoAluno);
        res.status(201).json({
            mensagem: `Aluno "${alunoCriado.nome}" criado com sucesso.`,
            ra: alunoCriado.ra,
            nome: alunoCriado.nome
        });
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

const atualizar = async (req, res) => {
    try {
        const { ra } = req.params;
        const dados = req.body;
        const alunoAtualizado = await alunoService.atualizarAluno(ra, dados);
        res.status(200).json({
            mensagem: `Aluno com RA ${ra} atualizado com sucesso.`,
            aluno: alunoAtualizado
        });
    } catch (err) {
        const status = err.message.includes('encontrado') ? 404 : 400;
        res.status(status).json({ erro: err.message });
    }
};

const deletar = async (req, res) => {
    try {
        const { ra } = req.params;
        const alunoRemovido = await alunoService.deletarAluno(ra);
        res.status(200).json({
            mensagem: `Aluno com RA ${ra} removido com sucesso.`,
            aluno: alunoRemovido,
            ra: alunoRemovido.ra,
            nome: alunoRemovido.nome
        });
    } catch (err) {
        res.status(404).json({ erro: err.message });
    }
};

module.exports = {
    listar,
    buscarPorRa,
    listarDisciplinas,
    criar,
    atualizar,
    deletar
};
