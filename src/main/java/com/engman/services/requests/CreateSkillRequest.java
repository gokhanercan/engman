package com.engman.services.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateSkillRequest {
    private Integer id;
    private String name;
    private String desc;
}
