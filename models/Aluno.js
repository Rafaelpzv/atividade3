const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
    codigo: { type: String, required: true, uppercase: true, trim: true },
    nome: { type: String, required: true, trim: true },
    professor: { type: String, required: true, trim: true }
});

const alunoSchema = new mongoose.Schema({
    ra: { type: String, required: true, unique: true, trim: true },
    nome: { type: String, required: true, trim: true },
    disciplinas: [disciplinaSchema]
}, { versionKey: false }); 

module.exports = mongoose.model('Aluno', alunoSchema);
