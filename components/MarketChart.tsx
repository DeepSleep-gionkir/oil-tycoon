import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MarketPoint } from '../types';

interface MarketChartProps {
  data: MarketPoint[];
  chartTitle: string;
  priceLabel: string;
}

const MarketChart: React.FC<MarketChartProps> = ({ data, chartTitle, priceLabel }) => {
  return (
    <div className="h-48 w-full bg-slate-900/50 rounded-lg p-2 border border-slate-700">
      <div className="text-xs text-slate-400 mb-2 font-mono uppercase tracking-widest">{chartTitle}</div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" hide />
          <YAxis 
            domain={['auto', 'auto']} 
            stroke="#94a3b8" 
            tick={{fontSize: 10}}
            tickFormatter={(val) => `$${val}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9' }}
            itemStyle={{ color: '#fbbf24' }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, priceLabel]}
            labelStyle={{ display: 'none' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#fbbf24" // Amber 400
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;