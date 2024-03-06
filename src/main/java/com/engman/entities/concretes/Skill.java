package com.engman.entities.concretes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {

    @Id
    private Integer id;
    private String name;     //React/CQRS etc..
    private String desc;

    //HOw easy to learn + cross relations (transitivity)
}
