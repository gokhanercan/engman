import { Grid } from "@vaadin/react-components/Grid.js";
import { GridColumn } from "@vaadin/react-components/GridColumn.js";
import SkillM from "Frontend/generated/com/engman/models/SkillM";
import Badge from "./Badge";

interface SkillsProps {
     skills: SkillM[] | null;
     title?: string | null;
}
export default function Skills({ skills,title}: SkillsProps) {
    return (
        <>
            {title && <b className="subTitle">{title}</b>}
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