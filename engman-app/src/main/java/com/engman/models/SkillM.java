package com.engman.models;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
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