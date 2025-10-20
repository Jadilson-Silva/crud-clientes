import Database from 'better-sqlite3';

const db = new Database('./db/database.db');

// Criação da tabela (se não existir)
db.exec(`
  CREATE TABLE IF NOT EXISTS pessoas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER,
    email TEXT
  );
`);

export default db;
