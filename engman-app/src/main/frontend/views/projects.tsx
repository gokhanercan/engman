import {useEffect, useState} from 'react';
import { ResourcesService } from "Frontend/generated/endpoints";
import Projects from 'Frontend/components/Projects';

export default function ProjectsView({ EntityName, Header }: { EntityName: string, Header: string }) {

    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        ResourcesService.getProjects().then(projects=>{
            console.log({Header},projects);
            setProjects(projects);
        })
        .catch(error => {
            console.error(`Failed to fetch {EntityName}`, error);
        });
    }, []);

    return (
        <>
            <Projects projects={projects} title="" />
        </>
    );
}