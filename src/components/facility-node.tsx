import { FacilityData, FacilityType } from '../types'

const icons: Record<FacilityType, string> = {
  rack: '📦',
  conveyor: '➡️',
  robot: '🤖',
  workstation: '🏭',
  gate: '🚪',
}

const colors: Record<FacilityType, string> = {
  rack: '#3b82f6',
  conveyor: '#10b981',
  robot: '#8b5cf6',
  workstation: '#f59e0b',
  gate: '#ef4444',
}

const statusColors = {
  active: {
    bg: '#d1fae5',
    text: '#065f46',
  },
  idle: {
    bg: '#f3f4f6',
    text: '#374151',
  },
  error: {
    bg: '#fee2e2',
    text: '#991b1b',
  },
}

export function FacilityNode({ data }: { data: FacilityData }) {
  const statusColor = statusColors[data.status || 'idle']

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '8px',
        border: `2px solid ${colors[data.type]}`,
        background: 'white',
        minWidth: '150px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <div className="text-2xl text-center">{icons[data.type]}</div>
      
      <div className="font-bold mt-2 text-center text-gray-800">
        {data.label}
      </div>
      
      {data.capacity && (
        <div className="text-xs text-gray-500 text-center mt-1">
          용량: {data.capacity}
        </div>
      )}
      
      <div
        style={{
          marginTop: '8px',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '11px',
          textAlign: 'center',
          background: statusColor.bg,
          color: statusColor.text,
        }}
      >
        {data.status || 'idle'}
      </div>
    </div>
  )
}

export default FacilityNode
