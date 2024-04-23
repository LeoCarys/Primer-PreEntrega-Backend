let cart = { id: generateUniqueId(), products: [] };


function getCartById(req, res) {
  const cartId = req.params.cid;
  if (cart.id !== cartId) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }
  res.json(cart.products);
}


function addToCart(req, res) {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;


  const product = findProductById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  let cart = findCartById(cartId);
  if (!cart) {
    cart = createNewCart(cartId);
  }

  const existingProduct = cart.products.find(p => p.id === productId);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ id: productId, quantity });
  }
  saveCart(cart);
  res.status(201).json(cart);
}

function findProductById(productId) {

  const product = products.find(p => p.id === productId);
  return product || null;
}

function findCartById(cartId) {
    const cart = carts.find(c => c.id === cartId);
    return cart || null;
}

function createNewCart(cartId) {
  return { id: cartId, products: [] };
}

const fs = require('fs');

function saveCart(cart) {
  try {
    const cartData = JSON.stringify(cart, null, 2);
    fs.writeFileSync('carrito.json', cartData);

    console.log('Carrito guardado correctamente.');
  } catch (error) {
    console.error('Error al guardar el carrito:', error.message);
  }
}

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = {
  getCartById,
  addToCart,
  saveCart,
};
