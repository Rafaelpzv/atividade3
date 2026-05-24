const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.listar);
router.get('/:ra', alunoController.buscarPorRa);
router.get('/:ra/disciplinas', alunoController.listarDisciplinas);
router.post('/', alunoController.criar);
router.put('/:ra', alunoController.atualizar);
router.delete('/:ra', alunoController.deletar);

module.exports = router;
