package com.engman.models;

import com.engman.core.domain.Developer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "developers")
public class DeveloperM {
    @Id
    private UUID id;
    private String name;
    private Integer age;
    private List<SkillLevelM> skillLevels;

    public HashMap<String,String> Fields = new HashMap<>();

    // Constructor without ID (for creation scenarios)
    public DeveloperM(String name, Integer age, List<SkillLevelM> skillLevels) {
        this(UUID.randomUUID(), name, age, skillLevels, new HashMap<>());
    }

    public Developer toDeveloper(){
        Developer d = new Developer(name);
        d.id = id;
        return d;
    }
    public static ArrayList<Developer> toDevelopers(List<DeveloperM> devs){
        ArrayList<Developer> developers = new ArrayList<>();
        for (DeveloperM dev : devs) {
            developers.add(dev.toDeveloper());
        }
        return developers;
    }
    public void fromDeveloper(Developer dev){
        this.name = dev.Name;
        this.id = dev.id;
        this.Fields = dev.Fields;
    }
    public static ArrayList<DeveloperM> fromDevelopers(List<Developer> devs){
        ArrayList<DeveloperM> developers = new ArrayList<>();
        for (Developer dev : devs) {
            DeveloperM devM = new DeveloperM();
            devM.fromDeveloper(dev);
            developers.add(devM);
        }
        return developers;
    }
}