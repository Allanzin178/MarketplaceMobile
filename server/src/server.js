const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productsRoutes = require('./routes/products');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/products', productsRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'FarmaExpress API is running!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});