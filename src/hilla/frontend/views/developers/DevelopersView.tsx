import React, { useEffect, useState } from "react";
import { ResourcesService } from "Frontend/generated/endpoints";
import { Grid } from "@hilla/react-components/Grid";
import { GridColumn } from "@hilla/react-components/GridColumn";
import DeveloperM from "Frontend/generated/src/models/DeveloperM";
import SkillM from './../../generated/src/models/SkillM';

interface SkillsProps {
    skills: SkillM[] | null;
}
const Skills: React.FC<SkillsProps> = ({ skills }) => {
    const badgeColors = ["success", "error", "contrast","secondary","tertiary"];
    const colors = ["midnightblue", "coral", "seagreen", "gold", "slategray", "tomato", "turquoise", "plum", "sandybrown", "steelblue"];
    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }
    return (
        <>
            {skills
                ? skills.map((skill, index) => (
                      <span
                          key={skill.Name??"n/a" + index}
                          style={{ background: `${getRandomColor()}`,}}
                          className="mr-1"
                          title={skill.Description}
                          {...{ theme: `badge primary` }}
                      >
                          {skill.Name}
                      </span>
                  ))
                : "- No skills -"}
        </>
    );
};

export default function DevelopersView() {
    const [developers, setDevelopers] = useState<DeveloperM[]>([]);
    useEffect(() => {
        ResourcesService.getDevelopers().then(devs=>{
            //console.log("Devs",devs);
            setDevelopers(devs);
        })
        .catch(error => {
            console.error("Failed to fetch developers", error);
        });
    }, []);
    return (
        <>
            <Grid items={developers}>
                <GridColumn path="Name" header="Name" />
                <GridColumn path="Age" header="Age"  />
                <GridColumn
                    header={"Skills"}
                    renderer={({ item }) => (
                        <Skills skills={item.Skills} />
                    )}
                />
            </Grid>
        </>
    );
}