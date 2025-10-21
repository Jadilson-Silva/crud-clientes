import express from 'express';
import { getPessoas, addPessoa, deletePessoa, updatePessoa } from '../controllers/pessoasController';


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

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, idade, email } = req.body;

  updatePessoa(id, { nome, idade, email });

  res.status(200).json({ message: 'Pessoa atualizada com sucesso' });
});
export default router;
