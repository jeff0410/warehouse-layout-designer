import { useState, useCallback } from 'react'
import {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import { FacilityData, FacilityType } from '../types'

const initialNodes: Node<FacilityData>[] = [
  {
    id: '1',
    type: 'facility',
    position: { x: 100, y: 100 },
    data: { label: '입고 게이트', type: 'gate', status: 'active' },
  },
  {
    id: '2',
    type: 'facility',
    position: { x: 400, y: 100 },
    data: { label: '컨베이어 벨트 A', type: 'conveyor', status: 'active' },
  },
  {
    id: '3',
    type: 'facility',
    position: { x: 700, y: 100 },
    data: { label: '보관 랙 1', type: 'rack', capacity: 1000, status: 'active' },
  },
  {
    id: '4',
    type: 'facility',
    position: { x: 400, y: 300 },
    data: { label: 'AGV 로봇', type: 'robot', status: 'idle' },
  },
  {
    id: '5',
    type: 'facility',
    position: { x: 700, y: 300 },
    data: { label: '작업 스테이션', type: 'workstation', status: 'active' },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e4-5', source: '4', target: '5', animated: true },
]

export const useWarehouseLayout = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedFacility, setSelectedFacility] = useState<FacilityType>('rack')

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  )

  const addFacility = useCallback(() => {
    const newNode: Node<FacilityData> = {
      id: `${Date.now()}`,
      type: 'facility',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: {
        label: `새 ${selectedFacility}`,
        type: selectedFacility,
        status: 'idle',
        ...(selectedFacility === 'rack' && { capacity: 500 }),
      },
    }
    setNodes((nds) => [...nds, newNode])
  }, [selectedFacility, setNodes])

  return {
    nodes,
    edges,
    selectedFacility,
    setSelectedFacility,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addFacility,
  }
}
