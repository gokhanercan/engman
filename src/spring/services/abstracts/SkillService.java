package services.abstracts;

import services.requests.CreateSkillRequest;
import services.responses.GetAllSkillsResponse;

import java.util.List;

public interface SkillService {
    void addSkill(CreateSkillRequest createSkillRequest);
    List<GetAllSkillsResponse> getSkills();
}
