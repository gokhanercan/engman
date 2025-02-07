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
                <GridColumn header="name"
                    renderer={({ item }) => (
                        <Badge label={item.name} colorName={item.customColorName}></Badge>
                    )}
                />
                <GridColumn path="description" header="Description" />
                <GridColumn path="hardness" header="Hardness" />
            </Grid>
        </>
    );
}