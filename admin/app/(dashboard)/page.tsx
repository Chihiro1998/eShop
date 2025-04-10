import Chart from "@/components/dashboard/Chart";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { Pacifico } from "next/font/google";
import { getSalesByMonth, getProfitByMonth } from "@/lib/actions/actions";
import CardBoard from "@/components/dashboard/CardBoard";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default async function Home() {

  //get data
  // const [salesByMonthData, profitByMonthData] = await Promise.all([
  //   getSalesByMonth(),
  //   getProfitByMonth()
  // ]);
  // const salesByMonth = salesByMonthData;
  // const profitByMonth = profitByMonthData;
  // const chartData = salesByMonth.map((salesData, index) => ({
  //   ...salesData,
  //   profit: profitByMonth[index].profit
  // }));

  const CardBoard = dynamic(
    () => import("@/components/dashboard/CardBoard"), {
    loading: () => <div>Loading CardBoard...</div>,
    ssr: true
  })
  const ChartBoard = dynamic(
    () => import("@/components/dashboard/ChartBoard"), {
    loading: () => <div>Loading Chart...</div>,
    ssr: true
  })

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

        <Suspense fallback={<div>Loading...</div>}>
          <CardBoard />
        </Suspense>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <ChartBoard />
        </div>
      </div>
    </div>
  );
}
