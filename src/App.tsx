import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type Pessoa = {
  id: number;
  nome: string;
  idade: number;
  email: string;
};


function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  // Carrega a lista ao iniciar
  useEffect(() => {
    fetch('http://localhost:3001/pessoas')
      .then(res => res.json())
      .then(data => setPessoas(data))
      .catch(err => console.error('Erro ao buscar pessoas:', err));
  }, []);

  // Função para adicionar nova pessoa
  const handleAddPessoa = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const novaPessoa = {
      nome: (form.nome as HTMLInputElement).value,
      idade: parseInt((form.idade as HTMLInputElement).value),
      email: (form.email as HTMLInputElement).value,
    };

    fetch('http://localhost:3001/pessoas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaPessoa),
    })
      .then(() => {
        form.reset();
        return fetch('http://localhost:3001/pessoas')
          .then(res => res.json())
          .then(setPessoas);
      });
  };

  // Função para excluir pessoa
  const handleDelete = (id: number, nome: string) => {
    if (!confirm(`Tem certeza que deseja excluir ${nome}?`)) return;

    fetch(`http://localhost:3001/pessoas/${id}`, {
      method: 'DELETE',
    }).then(() => {
      // Atualiza a lista localmente
      setPessoas(prev => prev.filter(p => p.id !== id));
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Pessoas</h1>

      {/* Formulário */}
      <form onSubmit={handleAddPessoa} className="mb-8 space-y-4">
        <input
          name="nome"
          placeholder="Nome"
          required
          className="border p-2 w-full rounded"
        />
        <input
          name="idade"
          type="number"
          placeholder="Idade"
          required
          className="border p-2 w-full rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Pessoa
        </button>
      </form>

      {/* Lista */}
      <ul className="space-y-4">
        {pessoas.map((pessoa) => (
          <li
            key={pessoa.id}
            className="border p-4 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <p><strong>Nome:</strong> {pessoa.nome}</p>
              <p><strong>Idade:</strong> {pessoa.idade}</p>
              <p><strong>Email:</strong> {pessoa.email}</p>
            </div>
            <button
              onClick={() => handleDelete(pessoa.id, pessoa.nome)}
              className="text-red-600 hover:underline text-sm"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;


