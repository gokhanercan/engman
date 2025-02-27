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
            <Grid items={developers}>
                <GridColumn
                    header={"Avatar"}
                    renderer={({ item }) => (
                        <>
                            <DeveloperAvatar developer={item} />
                        </>
                    )}
                />
                <GridColumn path="name" header="Name" />
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