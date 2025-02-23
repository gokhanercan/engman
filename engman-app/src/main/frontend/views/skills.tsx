import {useEffect, useState} from 'react';
import {Grid} from "@vaadin/react-components/Grid";
import {GridColumn} from "@vaadin/react-components/GridColumn";
import { ResourcesService } from "Frontend/generated/endpoints";
import SkillM from 'Frontend/generated/com/engman/models/SkillM';
import Badge from 'Frontend/components/Badge';
import Skills from 'Frontend/components/Skills';
import { Helmet } from 'react-helmet';

export default function SkillsView() {
    const [skills, setSkills] = useState<SkillM[]>([]);

    useEffect(() => {
        ResourcesService.getSkills().then(skills=>{
            console.log("Skills",skills);
            setSkills(skills);
        })
        .catch(error => {
            console.error("Failed to fetch skills.", error);
        });
    }, []);

    return (
        <>
            <Helmet><title>Skills</title></Helmet>
            <Skills skills={skills}></Skills>
        </>
    );
}