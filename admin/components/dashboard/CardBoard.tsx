import { getTotalSales } from "@/lib/actions/actions";
import { getTotalCustomers } from "@/lib/actions/actions";

import { CreditCard, Package, Users, TrendingUp } from "lucide-react";


const CardBoard = async () => {
  const [salesData, customersData] = await Promise.all([
    getTotalSales(),
    getTotalCustomers(),
  ]);
  const { numberOfOrders, totalRevenue, totalProfit } = salesData;
  const totalCustomers = customersData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-1/20 hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-1" />
          </div>
          {/* <span className="text-sm font-medium text-green-500">+12.5%</span> */}
        </div>
        <p className="text-gray-500 text-sm mb-1">Total Sales</p>
        <h2 className="text-2xl font-bold text-gray-800">${totalRevenue}</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-1/20 hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <CreditCard className="h-6 w-6 text-purple-1" />
          </div>
          {/* <span className="text-sm font-medium text-green-500">+8.2%</span> */}
        </div>
        <p className="text-gray-500 text-sm mb-1">Profit</p>
        <h2 className="text-2xl font-bold text-gray-800">${totalProfit.toFixed(2)}</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-1/20 hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Package className="h-6 w-6 text-purple-1" />
          </div>
          {/* <span className="text-sm font-medium text-green-500">+24.3%</span> */}
        </div>
        <p className="text-gray-500 text-sm mb-1">Total Orders</p>
        <h2 className="text-2xl font-bold text-gray-800">{numberOfOrders}</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-1/20 hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Users className="h-6 w-6 text-purple-1" />
          </div>
          {/* <span className="text-sm font-medium text-green-500">+18.7%</span> */}
        </div>
        <p className="text-gray-500 text-sm mb-1">Total Customers</p>
        <h2 className="text-2xl font-bold text-gray-800">{totalCustomers}</h2>
      </div>
    </div>
  )
}

export default CardBoard;