const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productsRoutes = require('./routes/products');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'FarmaExpress API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});