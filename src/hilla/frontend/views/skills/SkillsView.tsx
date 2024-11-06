import {useEffect, useState} from 'react';
import {Grid} from "@hilla/react-components/Grid";
import {GridColumn} from "@hilla/react-components/GridColumn";
import { ResourcesService } from "Frontend/generated/endpoints";

export default function SkillsView() {
    
    const initialSkills = [
        {skill:"java1", type:"language", desc2: "Java programming language"},
        {skill:"dotnet1", type:"framework", desc2: ".NET framework"},
        {skill:"csharp1", type:"language", desc2: "C# programming language"},
        {skill:"python1", type:"language", desc2: "Python programming language"},
        {skill:"azure", type:"cloud", desc2: "Microsoft Azure cloud services"}
    ];
    
    const [skills, setSkills] = useState(initialSkills);

    useEffect(() => {
        ResourcesService.getDevelopers().then(skills=>{
            console.log("Skills",skills);
        })
        .catch(error => {
            console.error("Failed to fetch skills!", error);
        });
    }, []);

    return (
        <>
            <h1>Skills</h1>
            <Grid
                items={skills}
                // onActiveItemChanged={e => setSelected(e.detail.value)}
                // selectedItems={[selected]}>
                >
                <GridColumn path="skill" />
                <GridColumn path="type"/>
                <GridColumn path="desc2"/>
                
                {/* <GridColumn path="email"/>
                <GridColumn path="company.name" header="Company name"/> */}
            </Grid>
        </>
    );
}