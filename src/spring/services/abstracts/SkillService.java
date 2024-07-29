package services.abstracts;

import engman.spring.services.requests.CreateSkillRequest;
import engman.spring.services.responses.GetAllSkillsResponse;

import java.util.List;

public interface SkillService {
    void addSkill(CreateSkillRequest createSkillRequest);
    List<GetAllSkillsResponse> getSkills();
}
