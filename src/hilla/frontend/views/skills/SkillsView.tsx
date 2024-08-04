import {useEffect, useState} from 'react';
import {Grid} from "@hilla/react-components/Grid";
import {GridColumn} from "@hilla/react-components/GridColumn";

export default function SkillsView() {
    
const [skills, setSkills] = useState(
    [
        {skill:"java", type:"language"},
        {skill:"dotnet", type:"framework"},
        {skill:"csharp", type:"language"},
        {skill:"python", type:"language"},
    ]
);
    return (
        <>
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