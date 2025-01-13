import Badge from "./Badge";
import Progress from "./Progress";
import SkillLevelM from "Frontend/generated/com/engman/models/SkillLevelM";

interface SkillLevelsProps {
    // skills: SkillM[];
    requiredSkills?: SkillLevelM[];
    showLevels?: boolean;
    showVertical?: boolean;
    showLevelInProgress?: boolean;
}

export default function Skills({requiredSkills,showLevels=false,showVertical=false,showLevelInProgress=false}: SkillLevelsProps) {
    console.log("showLevels",showLevels);
    if(!requiredSkills) {
        return null;
    }
    return (
        requiredSkills.map((requiredSkill, index) => (
            <div className={showVertical ? "mr-1 mb-4" : "mr-1 mb-1 "} key={index} style={{display: showVertical ? "block" : "inline-block"}}>
                <Badge 
                    label={requiredSkill.Skill?.Name ?? "n/a"} 
                    colorName={requiredSkill.Skill?.CustomColorName}
                    description={requiredSkill.Skill?.Description}
                />
                {showLevels && (
                    showLevelInProgress
                        ? <Progress key={requiredSkill.Skill?.Name ?? "n/a" + index} 
                                                    value={(requiredSkill.KnowledgePerc ?? 0)}
                                                    max={100} 
                                                    min={0} 
                                                    label={requiredSkill.Skill?.Name}
                                                    showValue={true}
                                                />
                        : `${requiredSkill.KnowledgePerc}%`
                )}
            </div>
        ))
    );
}