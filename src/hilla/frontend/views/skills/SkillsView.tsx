import ContactRecord from 'Frontend/generated/src/services/CRMService/ContactRecord';
import {useEffect, useState} from 'react';
import {CRMService} from "Frontend/generated/endpoints";
import {Grid} from "@hilla/react-components/Grid";
import {GridColumn} from "@hilla/react-components/GridColumn";
import ContactForm from "Frontend/views/contacts/ContactForm";


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
            <div className="pa-5" style={{padding:"20px"}}>
                <h2>Skills</h2>
                {skills.map((skill,index) => (
                    <div key={index} className="flex gap-m">
                        {skill.skill.toUpperCase()}
                    </div>
                ))}
            </div>

            <br></br>

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