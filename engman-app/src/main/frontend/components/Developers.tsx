import { Grid } from "@vaadin/react-components/Grid.js";
import { GridColumn } from "@vaadin/react-components/GridColumn.js";
import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";
import Skills from "./SkillsBadges";
import DeveloperAvatar from "./DeveloperAvatar";
import { Icon } from "@vaadin/react-components";

interface DeveloperCompProps {
    developers: DeveloperM[] | null;
    title?: string | null;
    showProgressBars?: boolean;
    pageLink?: string | null;
}

export default function Developers({ developers,title,showProgressBars=true,pageLink}: DeveloperCompProps) {
    return (
        <>
            {title && <b className="subTitle">{title}</b>}
            {/* {pageLink && <a href={pageLink}>Page</a>} */}
            {/* <a href="dsada">Gokhan</a> */}
            {/* <Icon icon="vaadin:phone" /> */}
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
                <GridColumn path="name" header="Name" />
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
                        <Skills requiredSkills={item.skillLevels } showLevels={true} showLevelInProgress={showProgressBars} showVertical={false}></Skills>
                    )}
                />
            </Grid>
        </>
    );
}