import { ReactFlow, useEdgesState, useNodesState, MiniMap, Controls, Background, addEdge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ProjectM from 'Frontend/generated/com/engman/models/ProjectM';
import { useCallback } from 'react';
interface FlowProps {
  projects: ProjectM[];
}

// const initialNodes = [
//     { id: '1', position: { x: 0, y: 0 }, data: { label: '1aa' } },
//     { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
//   ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Flow({ projects }: FlowProps) {
  //console.log('Projects', projects);
  // const onConnect = useCallback(
  //     (params) => setEdges((eds) => addEdge(params, eds)),
  //     [setEdges],
  //   );
  
  const projectNodes:Node[] = projects.map((project, index) => ({
    id: project.ID?.toString() ?? '',
    position: { x: 25, y: 75 + index * 120 },
    data: { label: project.Name ?? 'n/a' },
    type:'group',
    style: { width: 200, height: 100, backgroundColor: 'rgba(39, 91, 233, 0.16)',},
  }));

  const devNodes:any = projects.flatMap((project) => project.Developers ?? []).map((dev, proDevIndex) => ({ 
    id: `${proDevIndex}-{dev?.Name ?? ''}`,
    position: { x: 0, y: 0 + proDevIndex * 40 },
    data: { label: `${dev?.Name ?? 'n/a'}` },
    style: { width: 50, height: 30, backgroundColor: 'white',},
    parentId: '1', extent: 'parent' //TODO: get project id of dev
  }));

  const allNodes = projectNodes.concat(devNodes);

  // projectNodes.push({ id: 'G1', type:'group',
  //   position: { x: 50, y: 50 }, 
  //   data: { label: 'G1' },
  //   style: { width: 300, height: 300, backgroundColor: 'rgba(39, 91, 233, 0.16)',},
  //   });
  
  // const projectEdges: any = [
  //   { id: 'a', source: '1', target: '2', animated: true, style: { stroke: 'red' } },
  //   { id: 'b', source: '2', target: '3', animated: true },
  // ];

  const [nodes, setNodes, onNodesChange] = useNodesState(allNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(projectEdges);
//   const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ height: '100%', border: '1px solid red' }}>
      <ReactFlow
        nodes={allNodes}
        // edges={projectEdges}
        onNodesChange={onNodesChange}
        // onEdgesChange={onEdgesChange}
        panOnDrag={false}
        selectionOnDrag={false}
        // onConnect={onConnect}
        >
        <Controls />
        {/* <MiniMap /> */}
        {/* <Background variant="dots" gap={12} size={1} /> */}
      </ReactFlow>
      {/* <ReactFlow nodes={initialNodes} edges={initialEdges} /> */}
    </div>
  );
}
