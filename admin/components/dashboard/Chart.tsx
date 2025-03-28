"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 2000 },
  { month: 'Feb', sales: 3400 },
  { month: 'Mar', sales: 4800 },
  { month: 'Apr', sales: 4000 },
  { month: 'May', sales: 6500 },
];

const Chart = () => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-grey-1 shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
};

export default Chart;
