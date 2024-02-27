package com.engman.services.abstracts;

import com.engman.services.requests.CreateSkillRequest;
import com.engman.services.responses.GetAllSkillsResponse;

import java.util.List;

public interface SkillService {
    void addSkill(CreateSkillRequest createSkillRequest);
    List<GetAllSkillsResponse> getSkills();
}
