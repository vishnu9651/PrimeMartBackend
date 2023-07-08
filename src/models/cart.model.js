const mongoose=require("mongoose")
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: String,
      price: Number,
      quantity: Number
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
