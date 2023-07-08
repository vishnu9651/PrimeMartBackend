const axios = require('axios');
const {Cart} = require('../models/cart.model');
const express=require("express")
const cartRouter=express.Router()
const {authenticate}=require("../middlewares/authenticate.middleware");

cartRouter.post('/user',authenticate, async (req,res) => {

    try {
    const { productId  } = "1";
    const user = req.user;

    // Fetch the product data from the API
    const response = await axios.get(`https://modern-jersey-bee.cyclic.app/grocery/${productId}`);
    const product = response.data;

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cartItem = {
      productId: product.id, // Use the product ID from the API response
      name: product.name,
      price: product.price,
      quantity: 1
    };

    // Check if the user already has a cart
    let cart = await Cart.findOne({ user: user._id });

    if (!cart) {
      // Create a new cart if the user doesn't have one
      cart = new Cart({ user: user._id, items: [] });
    }

    // Check if the item is already in the cart
    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, increase the quantity
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Otherwise, add the new item to the cart
      cart.items.push(cartItem);
    }

    // Save the cart to the database
    await cart.save();

    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports={cartRouter}