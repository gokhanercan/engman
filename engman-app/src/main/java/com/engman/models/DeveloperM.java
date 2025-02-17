package com.engman.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.UUID;

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

    // Constructor without ID (for creation scenarios)
    public DeveloperM(String name, Integer age, List<SkillLevelM> skillLevels) {
        this(UUID.randomUUID(), name, age, skillLevels);
    }
}