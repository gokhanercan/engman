import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ProjectM from 'Frontend/generated/com/engman/models/ProjectM';
interface FlowProps {
    projects: ProjectM[];
}

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1aa' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Badge({projects}:FlowProps) {
    console.log("Projects",projects);
    const projectNodes = projects.map((project, index) => (
        {
            gokhan:'gokhan',
            id: project.ID?.toString() ?? '',
            position: { x: 100, y: 50 + (index * 50) },
            data: { label: project.Name }
        }
    )
    );
    
    return (
        <div style={{ height: '100%', border: '1px solid red' }}>
            <ReactFlow nodes={projectNodes} />
            {/* <ReactFlow nodes={initialNodes} edges={initialEdges} /> */}
      </div>
    );
}