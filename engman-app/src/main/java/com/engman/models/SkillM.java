package com.engman.models;
import com.engman.core.domain.Skill;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "skills")
public class SkillM {

    @Id
    private UUID id;
    private String name;
    private String description;
    private Integer hardness;
    private String customColorName;

    // Constructor without ID (for creation scenarios)
    public SkillM(String Name, String Description, Integer Hardness, String CustomColorName) {
        this(UUID.randomUUID(), Name, Description, Hardness, CustomColorName);
    }

    public Skill toSkill(){
        return new Skill(name);
    }
    public static ArrayList<Skill> toSkills(List<SkillM> skills){
        ArrayList<Skill> skillsList = new ArrayList<>();
        for (SkillM skill : skills) {
            skillsList.add(skill.toSkill());
        }
        return skillsList;
    }
}