package com.engman.services.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllSkillsResponse {
    private Integer id;
    private String name;
    private String desc;
}
