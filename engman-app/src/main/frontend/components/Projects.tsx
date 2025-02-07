import { Grid } from "@vaadin/react-components/Grid.js";
import { GridColumn } from "@vaadin/react-components/GridColumn.js";
import DeveloperM from "Frontend/generated/com/engman/models/DeveloperM";
import Skills from "./SkillsBadges";
import DeveloperAvatar from "./DeveloperAvatar";
import DeveloperGroupAvatar from "./DeveloperGroupAvatar";

interface ProjectsCompProps {
    projects: DeveloperM[] | null;
    title?: string | null;
    showProgressBars?: boolean;
    compactMode?: boolean;
}

interface MyGridColumnProps {
    path: string;
    header: string;
    renderer?: any;
    visible?: boolean;
}

const MyGridColumn = ({ path, header, renderer, visible=true}:MyGridColumnProps) => {
    if (!visible) return null;
    return (
        <GridColumn path={path} header={header} renderer={renderer} />
    );
}

export default function Projects({
    projects,
    title,
    showProgressBars = true,
    compactMode = false,
}: ProjectsCompProps) {
    return (
        <>
            {title && <b className="subTitle">{title}</b>}
            <Grid items={projects} theme={compactMode ? "compact" : ""} >
                <GridColumn path="Name" header="Name" />
                <MyGridColumn path="Description" header="Description"  visible={!compactMode} />
                <MyGridColumn path="Budget" header="Budget" renderer={undefined} visible={!compactMode} />
                <GridColumn
                    header="Skills"
                    renderer={({ item }) => (
                        <Skills
                            requiredSkills={item.RequiredSkills}
                            showLevels={true}
                            showVertical={true}
                            showLevelInProgress={true}
                        />
                    )}
                />
                <GridColumn
                    header="Developers"
                    renderer={({ item }) => (
                        <>
                            <DeveloperGroupAvatar developers={item.Developers} />
                        </>
                    )}
                />
                
            </Grid>
        </>
    );
}
