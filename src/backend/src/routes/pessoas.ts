import express from 'express';
import { getPessoas, addPessoa, deletePessoa } from '../controllers/pessoasController';

const router = express.Router();

router.get('/', (req, res) => {
  const pessoas = getPessoas();
  res.json(pessoas);
});

router.post('/', (req, res) => {
  const novaPessoa = addPessoa(req.body);
  res.status(201).json(novaPessoa);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  deletePessoa(id);
  res.status(204).send();
});

export default router;
