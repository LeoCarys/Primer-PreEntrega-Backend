const express = require('express');
const router = express.Router();

const { createCart, getCartById, addToCart } = require('../controllers/carts.controller');

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addToCart);

module.exports = router;
