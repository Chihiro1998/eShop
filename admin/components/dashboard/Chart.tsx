"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ChartData {
  month: string;
  sales: number;
  profit?: number;
}

const Chart = ({ data }: { data: ChartData[] }) => {
  const [showProfit, setShowProfit] = useState(false);
  const profitClassname = showProfit ? "bg-purple-2 text-white hover:bg-purple-1" : "bg-white text-purple-2 hover:bg-purple-1";
  const salesClassname = !showProfit ? "bg-purple-2 text-white hover:bg-purple-1" : "bg-white text-purple-2 hover:bg-purple-1";


  return (
    <div className="bg-white p-6 rounded-3xl border border-grey-1 shadow-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sales Overview</h2>
        <div className="flex gap-2">
          <Button
            variant={!showProfit ? "default" : "outline"}
            onClick={() => setShowProfit(false)}
            className={salesClassname}
          >
            Sales
          </Button>
          <Button
            variant={showProfit ? "default" : "outline"}
            onClick={() => setShowProfit(true)}
            className={profitClassname}
          >
            Profit
          </Button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={showProfit ? "profit" : "sales"}
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
};

export default Chart;
