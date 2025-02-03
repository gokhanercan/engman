package com.engman.models;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
}


//@Document(collection = "skills")
//public record SkillM(@Id String ID, String Name, String Description, Integer Hardness, String CustomColorName) {   //SkillLevelM SkillLevel
//
////    public SkillM(String Name, String Description, Integer Hardness, String CustomColorName) {
////        this(Name, Description, Hardness, CustomColorName,null);
////    }
//
//}