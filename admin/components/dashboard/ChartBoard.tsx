import { getSalesByMonth } from "@/lib/actions/actions";
import { getProfitByMonth } from "@/lib/actions/actions";
import Chart from "./Chart";


const ChartData = async () => {
  const [salesByMonthData, profitByMonthData] = await Promise.all([
    getSalesByMonth(),
    getProfitByMonth()
  ]);
  const salesByMonth = salesByMonthData;
  const profitByMonth = profitByMonthData;
  const chartData = salesByMonth.map((salesData, index) => ({
    ...salesData,
    profit: profitByMonth[index].profit
  }));
  return (
    <Chart data={chartData} />
  )
}

export default ChartData;