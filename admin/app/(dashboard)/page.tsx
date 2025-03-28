import Chart from "@/components/dashboard/Chart";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { Pacifico } from "next/font/google";
import { TrendingUp, Package, CreditCard, Users } from "lucide-react";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="h-screen w-full overflow-auto">
      <div className="px-10 py-8 bg-gray-50 min-h-full">
        <div className="flex justify-between items-center">
          <div>
            <p className={`${pacifico.className} text-[32px] text-purple-1 mb-1`}>Dashboard</p>
            <p className="text-gray-500">Welcome back to Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </div>

        <Separator className="bg-grey-1/50 my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-1/20 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-1" />
              </div>
              <span className="text-sm font-medium text-green-500">+12.5%</span>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Sales</p>
            <h2 className="text-2xl font-bold text-gray-800">$12,340</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-1/20 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-1" />
              </div>
              <span className="text-sm font-medium text-green-500">+8.2%</span>
            </div>
            <p className="text-gray-500 text-sm mb-1">Profit</p>
            <h2 className="text-2xl font-bold text-gray-800">$5,780</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-1/20 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-1" />
              </div>
              <span className="text-sm font-medium text-green-500">+24.3%</span>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Orders</p>
            <h2 className="text-2xl font-bold text-gray-800">523</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-1/20 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-1" />
              </div>
              <span className="text-sm font-medium text-green-500">+18.7%</span>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Customers</p>
            <h2 className="text-2xl font-bold text-gray-800">1,482</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <Chart />
        </div>
      </div>
    </div>
  );
}
