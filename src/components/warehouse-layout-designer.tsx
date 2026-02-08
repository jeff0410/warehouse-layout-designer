import { useCallback } from "react";
import ReactFlow, {
  Background,
  type Connection,
  Controls,
  MiniMap,
  type NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";

import { Button, Tooltip } from "dak-krds";
import { useWarehouseLayout } from "../hooks/use-warehouse-layout";
import type { FacilityType } from "../types";
import FacilityNode from "./facility-node";

const nodeTypes: NodeTypes = {
  facility: FacilityNode,
};

export function WarehouseLayoutDesigner() {
  const {
    nodes,
    edges,
    selectedFacility,
    setSelectedFacility,
    onNodesChange,
    onEdgesChange,
    onConnect: handleConnect,
    addFacility,
  } = useWarehouseLayout();

  const onConnect = useCallback(
    (params: Connection) => handleConnect(params),
    [handleConnect],
  );

  return (
    <div className="w-screen h-screen flex flex-col">
      <Tooltip content="테스트">
        <Button label="테스트" variant="primary" />
      </Tooltip>
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex gap-3 items-center">
        <h2 className="text-xl font-bold text-gray-800 mr-6">
          물류 센터 레이아웃 설계
        </h2>

        <select
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value as FacilityType)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="rack">보관 랙</option>
          <option value="conveyor">컨베이어</option>
          <option value="robot">AGV 로봇</option>
          <option value="workstation">작업 스테이션</option>
          <option value="gate">게이트</option>
        </select>

        <button
          type="button"
          onClick={addFacility}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
        >
          + 설비 추가
        </button>

        <div className="ml-auto text-gray-500 text-sm">
          💡 설비를 드래그하여 배치하고, 노드를 연결하여 물류 흐름을 설계하세요
        </div>
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}

export default WarehouseLayoutDesigner;
