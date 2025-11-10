const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'products.json');

// Carregar produtos do arquivo ou usar array padrão
let products = [];
try {
  if (fs.existsSync(dataFile)) {
    const data = fs.readFileSync(dataFile, 'utf8');
    products = JSON.parse(data);
  } else {
    // Dados iniciais
    products = [
      {
        id: '1',
        nome: 'Dipirona monoidratada 100mg Generico',
        image: 'https://raw.githubusercontent.com/Allanzin178/MarketplaceMobile/main/assets/images/dipirona.png',
        descricao: '20 Comprimidos',
        preco: 9.90
      },
      {
        id: '2',
        nome: 'Colorio ecoflim 5mg/ml',
        image: 'https://raw.githubusercontent.com/Allanzin178/MarketplaceMobile/main/assets/images/colirio.png',
        descricao: '15 Ml',
        preco: 15.00
      },
      {
        id: '3',
        nome: 'Bepantol',
        image: 'https://raw.githubusercontent.com/Allanzin178/MarketplaceMobile/main/assets/images/bepantol.png',
        descricao: '125 Gramas',
        preco: 15.00
      },
      {
        id: '4',
        nome: 'Xarope 44E VICK',
        image: 'https://raw.githubusercontent.com/Allanzin178/MarketplaceMobile/main/assets/images/xarope.png',
        descricao: '100 Ml',
        preco: 15.00
      }
    ];
    // Salvar dados iniciais no arquivo
    saveProducts();
  }
} catch (error) {
  console.error('Erro ao carregar produtos:', error);
}

// Função para salvar produtos no arquivo
function saveProducts() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
  }
}

module.exports = {
  products,
  saveProducts
};