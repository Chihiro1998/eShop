import Order from "../models/Order";
import User from "../models/User";
import Product from "../models/Product";
import { connectToDB } from "../mongoDB";

export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find({}) //get all orders
  const numberOfOrders = orders.length;
  const totalRevenue = orders.reduce((total, order) => total + order.amount, 0);


  let totalProfit = 0;
  for (const order of orders) {
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        const profitPerItem = (item.price - product.expense) * item.quantity;
        totalProfit += profitPerItem;
      }
    }
  }

  return { numberOfOrders, totalRevenue, totalProfit }
}

export const getTotalCustomers = async () => {
  await connectToDB();
  const customers = await User.find({})
  return customers.length;
}

export const getSalesByMonth = async () => {
  await connectToDB();
  const orders = await Order.find({})

  const salesByMonth = orders.reduce((acc, order) => {
    const month = order.createdAt.getMonth(); //0-11
    acc[month] = (acc[month] || 0) + order.amount;
    return acc;
  }, {});
  const graphData = Array.from({ length: 12 }, (_, i) => ({
    month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(new Date().getFullYear(), i)),
    sales: salesByMonth[i] || 0
  }));
  return graphData;
}



export const getProfitByMonth = async () => {
  await connectToDB();
  const orders = await Order.find({})

  const profitByMonth = {};
  for (const order of orders) {
    const month = order.createdAt.getMonth(); //0-11
    let monthProfit = 0;

    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        const profitPerItem = (item.price - product.expense) * item.quantity;
        monthProfit += profitPerItem;
      }
    }

    profitByMonth[month] = (profitByMonth[month] || 0) + monthProfit;
  }

  const graphData = Array.from({ length: 12 }, (_, i) => ({
    month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(new Date().getFullYear(), i)),
    profit: profitByMonth[i] || 0
  }));
  return graphData;
}