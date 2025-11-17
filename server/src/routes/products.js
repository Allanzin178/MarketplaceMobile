const express = require('express');
const router = express.Router();
const { products, saveProducts } = require('../data/products');

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const filtered = products.filter(product => 
    product.nome.toLowerCase().includes(query)
  );
  res.json(filtered);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  res.json(product);
});

router.post('/', (req, res) => {
  const { nome, descricao, preco, image, categoria } = req.body;
  
  if (!nome || !preco || !image) {
    return res.status(400).json({ message: 'Nome, preço e imagem são obrigatórios' });
  }

  const newProduct = {
    id: Date.now().toString(),
    nome,
    descricao,
    preco: Number(preco),
    image,
    categoria: categoria || undefined
  };

  products.push(newProduct);
  saveProducts();
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  const { nome, descricao, preco, image, categoria } = req.body;
  products[index] = {
    ...products[index],
    nome: nome || products[index].nome,
    descricao: descricao !== undefined ? descricao : products[index].descricao,
    preco: preco ? Number(preco) : products[index].preco,
    image: image || products[index].image,
    categoria: categoria !== undefined ? categoria : products[index].categoria
  };

  saveProducts();
  res.json(products[index]);
});

router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  products.splice(index, 1);
  saveProducts();
  res.status(204).send();
});

module.exports = router;