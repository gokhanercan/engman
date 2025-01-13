import {useEffect, useState} from 'react';
import {Grid} from "@vaadin/react-components/Grid";
import {GridColumn} from "@vaadin/react-components/GridColumn";
import { ResourcesService } from "Frontend/generated/endpoints";
import SkillM from 'Frontend/generated/com/engman/models/SkillM';
import Badge from 'Frontend/components/Badge';

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
            <h1>Skills</h1>
            <Grid items={skills}>
                {/* <GridColumn path="Name" header="Name" /> */}
                <GridColumn  header="Name"
                    renderer={({ item }) => (
                        <Badge label={item.Name} colorName={item.CustomColorName}></Badge>
                    )}
                />
                <GridColumn path="Description" header="Description" />
                <GridColumn path="Hardness" header="Hardness" />
            </Grid>
        </>
    );
}