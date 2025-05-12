package com.engman.models;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document("modules")
@Data
public class ModuleInfoContainerM {
    @Id
    private String id = "1";

    private Map<String, ModuleInfoM> modules;
}