import express from 'express';
import cors from 'cors';
import pessoasRoutes from './routes/pessoas';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/pessoas', pessoasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
