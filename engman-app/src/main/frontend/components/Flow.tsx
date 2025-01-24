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
  console.log('Projects', projects);
  // const onConnect = useCallback(
  //     (params) => setEdges((eds) => addEdge(params, eds)),
  //     [setEdges],
  //   );
  const projectNodes:Node[] = projects.map((project, index) => ({
    id: project.ID?.toString() ?? '',
    position: { x: 100, y: 75 + index * 100 },
    data: { label: project.Name ?? '' },
    parentId: 'G1',
    extent: 'parent',
  }));
  projectNodes.push({ id: 'G1', type:'group',
    position: { x: 50, y: 50 }, 
    data: { label: 'G1' },
    style: { width: 300, height: 300,    backgroundColor: 'rgba(39, 91, 233, 0.16)',},
    });
    projectNodes.push({ id: 'PX',
        position: { x: 100, y: 400 }, 
        data: { label: 'PX' },
        });
  const projectEdges: any = [
    { id: 'a', source: '1', target: '2', animated: true, style: { stroke: 'red' } },
    { id: 'b', source: '2', target: '3', animated: true },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(projectNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(projectEdges);
//   const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ height: '100%', border: '1px solid red' }}>
      <ReactFlow
        nodes={projectNodes}
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
