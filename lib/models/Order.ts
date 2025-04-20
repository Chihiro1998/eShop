// models/Order.ts

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user:     { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity:  { type: Number, required: true },
      price:     { type: Number, required: true },
    }
  ],
  amount:    { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

if (mongoose.models.Order) {
  mongoose.deleteModel('Order');
}

const Order = mongoose.model('Order', OrderSchema);

export default Order;
