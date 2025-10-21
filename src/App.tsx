import { useEffect, useState } from 'react';

// Tipo da pessoa
type Pessoa = {
  id: number;
  nome: string;
  idade: number;
  email: string;
};

function App() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null);

  // Inputs controlados
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');

  // Buscar lista de pessoas
  useEffect(() => {
    buscarPessoas();
  }, []);

  const buscarPessoas = () => {
    fetch('http://localhost:3001/pessoas')
      .then(res => res.json())
      .then(setPessoas)
      .catch(err => console.error('Erro ao buscar pessoas:', err));
  };

  const limparFormulario = () => {
    setNome('');
    setIdade('');
    setEmail('');
    setPessoaEditando(null);
    setModoEdicao(false);
  };

  // Submissão do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pessoa = {
      nome,
      idade: parseInt(idade),
      email,
    };

    if (modoEdicao && pessoaEditando) {
      // Atualizar pessoa existente (PUT)
      fetch(`http://localhost:3001/pessoas/${pessoaEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoa),
      }).then(() => {
        limparFormulario();
        buscarPessoas();
      });
    } else {
      // Criar nova pessoa (POST)
      fetch(`http://localhost:3001/pessoas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, idade, email }),
    }).then(() => {
        limparFormulario();
        buscarPessoas();
      });
    }
  };

  const handleDelete = (id: number, nome: string) => {
    if (!confirm(`Deseja excluir ${nome}?`)) return;

    fetch(`http://localhost:3001/pessoas/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setPessoas(prev => prev.filter(p => p.id !== id));
    });
  };

  const iniciarEdicao = (pessoa: Pessoa) => {
    setPessoaEditando(pessoa);
    setModoEdicao(true);
    setNome(pessoa.nome);
    setIdade(String(pessoa.idade));
    setEmail(pessoa.email);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Pessoas</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          name="nome"
          placeholder="Nome"
          required
          className="border p-2 w-full rounded"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          name="idade"
          type="number"
          placeholder="Idade"
          required
          className="border p-2 w-full rounded"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {modoEdicao ? 'Salvar Alterações' : 'Adicionar Pessoa'}
          </button>
          {modoEdicao && (
            <button
              type="button"
              onClick={limparFormulario}
              className="text-gray-600 hover:underline"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de Pessoas */}
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
            <div className="flex gap-4">
              <button
                onClick={() => iniciarEdicao(pessoa)}
                className="text-blue-600 hover:underline text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(pessoa.id, pessoa.nome)}
                className="text-red-600 hover:underline text-sm"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
