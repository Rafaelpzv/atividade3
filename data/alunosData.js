let alunos = [
    {
        "ra": "1",
        "nome": "João",
        "disciplinas": [
            { "codigo": "MAT101", "nome": "Matemática", "professor": "Prof. Carlos" },
            { "codigo": "HIS101", "nome": "História", "professor": "Prof. Ana" },
            { "codigo": "POR101", "nome": "Português", "professor": "Prof. João" },
            { "codigo": "GEO101", "nome": "Geografia", "professor": "Prof. Ana" }
        ]
    },
    {
        "ra": "2",
        "nome": "Maria",
        "disciplinas": [
            { "codigo": "MAT101", "nome": "Matemática", "professor": "Prof. Carlos" },
            { "codigo": "HIS101", "nome": "História", "professor": "Prof. Ana" },
            { "codigo": "GEO101", "nome": "Geografia", "professor": "Prof. Ana" }
        ]
    },
    {
        "ra": "3",
        "nome": "Pedro",
        "disciplinas": [
            { "codigo": "CIE101", "nome": "Ciências", "professor": "Prof. João" },
            { "codigo": "HIS101", "nome": "História", "professor": "Prof. Ana" },
            { "codigo": "POR101", "nome": "Português", "professor": "Prof. João" },
            { "codigo": "GEO101", "nome": "Geografia", "professor": "Prof. Ana" },
            { "codigo": "EDF101", "nome": "Educação Física", "professor": "Prof. Carlos" }
        ]
    }
];

function getAll() {
    return alunos;
}

function findByRa(ra) {
    return alunos.find(a => a.ra === ra);
}

function findIndexByRa(ra) {
    return alunos.findIndex(a => a.ra === ra);
}

function insert(aluno) {
    alunos.push(aluno);
    return aluno;
}

function update(index, updatedData) {
    alunos[index] = { ...alunos[index], ...updatedData };
    return alunos[index];
}

function remove(index) {
    const removed = alunos[index];
    alunos.splice(index, 1);
    return removed;
}

module.exports = {
    getAll,
    findByRa,
    findIndexByRa,
    insert,
    update,
    remove
};
