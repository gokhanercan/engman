import {useEffect, useState} from 'react';
import {Grid} from "@hilla/react-components/Grid";
import {GridColumn} from "@hilla/react-components/GridColumn";
import { ResourcesService } from "Frontend/generated/endpoints";

export default function SkillsView() {
    
    const initialSkills = [
        {skill:"java1", type:"language"},
        {skill:"dotnet1", type:"framework"},
        {skill:"csharp1", type:"language"},
        {skill:"python1", type:"language"}
    ];
    const [skills, setSkills] = useState(initialSkills);

    // useEffect(() => {
    //     ResourcesService.getDevelopers().then(skills=>{
    //         console.log("Skills",skills);
    //     })
    //     .catch(error => {
    //         console.error("Failed to fetch skills!", error);
    //     });
    // }, []);

    return (
        <>
        {/* <p class="p-8">DENEME</p> */}
            <Grid
                items={skills}
                // onActiveItemChanged={e => setSelected(e.detail.value)}
                // selectedItems={[selected]}>
                >
                <GridColumn path="skill" />
                <GridColumn path="type"/>
                
                {/* <GridColumn path="email"/>
                <GridColumn path="company.name" header="Company name"/> */}
            </Grid>
            
        </>
    )
}