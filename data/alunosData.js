
const Aluno = require('../models/Aluno');


async function getAll() {
    return await Aluno.find();
}


async function findByRa(ra) {
    return await Aluno.findOne({ ra });
}

async function findIndexByRa(ra) {
    const aluno = await Aluno.findOne({ ra });
    return aluno ? aluno._id : -1;
}

async function insert(alunoData) {
    const aluno = new Aluno(alunoData);
    return await aluno.save();
}

async function update(ra, updatedData) {
    return await Aluno.findOneAndUpdate(
        { ra },
        updatedData,
        { new: true, runValidators: true }
    );
}

async function remove(ra) {
    return await Aluno.findOneAndDelete({ ra });
}

module.exports = {
    getAll,
    findByRa,
    findIndexByRa,
    insert,
    update,
    remove
};
