package com.engman.models;

import com.engman.core.domain.Developer;
import com.engman.core.domain.Field;
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

//    @Deprecated
//    public HashMap<String,String> Fields = new HashMap<>();

    private HashMap<String, FieldM> fields = new HashMap<>();

    // Constructor without ID (for creation scenarios)
    public DeveloperM(String name, Integer age, List<SkillLevelM> skillLevels) {
        this(UUID.randomUUID(), name, age, skillLevels,new HashMap<>());
    }
    public DeveloperM(String name, Integer age, List<SkillLevelM> skillLevels, HashMap<String,FieldM> fields) {
        this(UUID.randomUUID(), name, age, skillLevels, fields);
    }

    public Developer toDeveloper(){
        Developer d = new Developer(name);
        d.id = id;
        d.fields = FieldM.toFields(fields);
        //TODO: skills and other properties
        return d;
    }
    /*
    Converts a list of DeveloperM to a list of Developer. App->Core
     */
    public static ArrayList<Developer> toDevelopers(List<DeveloperM> devs){
        ArrayList<Developer> developers = new ArrayList<>();
        for (DeveloperM dev : devs) {
            developers.add(dev.toDeveloper());
        }
        return developers;
    }
    public void fromDeveloper(Developer core){
        this.name = core.name;
        this.id = core.id;
        this.fields = FieldM.fromFields(core.fields);
        //TODO:map other fields
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