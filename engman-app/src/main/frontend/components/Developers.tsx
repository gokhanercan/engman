import { Grid } from "@vaadin/react-components/Grid.js";
import { GridColumn } from "@vaadin/react-components/GridColumn.js";
import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";
import Skills from "./Skills";
import DeveloperAvatar from "./DeveloperAvatar";

interface DeveloperCompProps {
    developers: DeveloperM[] | null;
    title?: string | null;
    showProgressBars?: boolean;
}

export default function Developers({ developers,title,showProgressBars=true }: DeveloperCompProps) {
    return (
        <>
            {title && <b>{title}</b>}
            <Grid items={developers}>
                <GridColumn
                    header={"Avatar"}
                    renderer={({ item }) => (
                        <>
                            <DeveloperAvatar developer={item} />
                            {/* <p style={{display:'inline'}}>{item.Name}</p> */}
                        </>
                    )}
                />
                <GridColumn path="Name" header="Name" />
                {/* <GridColumn path="Age" header="Age"  /> */}
                {/* <GridColumn header="Age2"
                    renderer={({ item }) => (
                        <>
                            <span>{item.Age}</span>
                            {showProgressBars && 
                                <Progress min={20} max={60} value={item.Age} />
                            }
                        </>
                    )}
                /> */}
                <GridColumn
                    header={"Skills"}
                    renderer={({ item }) => (
                        <Skills requiredSkills={item.SkillLevels } showLevels={true} showLevelInProgress={showProgressBars} showVertical={false}></Skills>
                    )}
                />
            </Grid>
        </>
    );
}