import { Card } from "@/components/ui/card"

export function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <Card className="glass-dark p-4 border border-white/10">
        <p className="text-sm font-bold text-gray-200 mb-2">{`Date: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm text-gray-300">
            <span style={{ color: entry.stroke || entry.color }}>{entry.payload.subject}</span>:{" "}
            {entry.payload.testName} :{" "}
            <span className="font-bold" style={{ color: entry.stroke || entry.color }}>
              {entry.value}%
            </span>
          </p>
        ))}
      </Card>
    )
  }

  return null
}
