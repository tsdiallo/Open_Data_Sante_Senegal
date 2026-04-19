import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatNumber } from '../../utils/format.js'

const COLORS = ['#00853F', '#E8B923', '#E31B23', '#2563eb', '#7c3aed']
const TICK = { fontSize: 11, fill: '#64748b', fontFamily: 'Inter, sans-serif' }

export default function LineTimeSeries({ data, xKey, series }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 5, right: 15, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#e8e6df" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={TICK}
          tickLine={false}
          axisLine={{ stroke: '#e8e6df' }}
        />
        <YAxis
          tick={TICK}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatNumber}
        />
        <Tooltip
          formatter={(v) => formatNumber(v)}
          labelStyle={{ fontSize: 12, color: '#0c1116', fontWeight: 600 }}
          contentStyle={{
            fontSize: 12,
            borderRadius: 10,
            border: '1px solid rgba(12,17,22,0.08)',
            boxShadow: '0 4px 12px rgba(12,17,22,0.06)',
          }}
        />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" />
        {series.map((s, i) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2.25}
            dot={{ r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
