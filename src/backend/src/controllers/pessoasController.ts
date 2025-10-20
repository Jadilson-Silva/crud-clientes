import db from '../db';

export const getPessoas = () => {
  return db.prepare('SELECT * FROM pessoas').all();
};

export const addPessoa = (pessoa: { nome: string; idade: number; email: string }) => {
  const stmt = db.prepare('INSERT INTO pessoas (nome, idade, email) VALUES (?, ?, ?)');
  const result = stmt.run(pessoa.nome, pessoa.idade, pessoa.email);
  return { id: result.lastInsertRowid };
};

export const deletePessoa = (id: number) => {
  db.prepare('DELETE FROM pessoas WHERE id = ?').run(id);
};
