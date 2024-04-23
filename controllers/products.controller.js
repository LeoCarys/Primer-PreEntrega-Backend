let products = [];

function getProducts(req, res) {
  res.json(products);
}

function getProductById(req, res) {
  const productId = req.params.pid;
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
}

function addProduct(req, res) {
      const newProduct = req.body;
      if (!newProduct.title || !newProduct.price) {
      return res.status(400).json({ error: 'El producto debe tener un título y un precio' });
    }

    newProduct.id = generateUniqueId();
    products.push(newProduct);
    res.status(201).json(newProduct);
  }
  
  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

function updateProduct(req, res) {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  products[productIndex] = { ...products[productIndex], ...updatedProduct };
  res.json(products[productIndex]);
}

function deleteProduct(req, res) {
  const productId = req.params.pid;
  products = products.filter(p => p.id !== productId);
  res.status(204).end();
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
