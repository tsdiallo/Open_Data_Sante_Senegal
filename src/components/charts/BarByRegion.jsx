import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatNumber } from '../../utils/format.js'

const TICK = { fontSize: 11, fill: '#64748b', fontFamily: 'Inter, sans-serif' }

export default function BarByRegion({ data, dataKey, valueLabel, color = '#00853F' }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#e8e6df" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="nom"
          tick={TICK}
          tickLine={false}
          axisLine={{ stroke: '#e8e6df' }}
          interval={0}
          angle={-30}
          textAnchor="end"
          height={70}
        />
        <YAxis
          tick={TICK}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatNumber}
        />
        <Tooltip
          cursor={{ fill: 'rgba(0, 133, 63, 0.06)' }}
          formatter={(v) => [formatNumber(v), valueLabel]}
          labelStyle={{ fontSize: 12, color: '#0c1116', fontWeight: 600 }}
          contentStyle={{
            fontSize: 12,
            borderRadius: 10,
            border: '1px solid rgba(12,17,22,0.08)',
            boxShadow: '0 4px 12px rgba(12,17,22,0.06)',
          }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
