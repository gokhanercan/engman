package engman.spring.services.concretes;

import engman.spring.common.utilities.mappers.ModelMapperService;
import engman.spring.entities.abstracts.SkillRepository;
import engman.spring.entities.concretes.Skill;
import engman.spring.services.abstracts.SkillService;
import engman.spring.services.requests.CreateSkillRequest;
import engman.spring.services.responses.GetAllSkillsResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SkillManager implements SkillService {
    private SkillRepository skillRepository;
    private ModelMapperService modelMapperService;

    @Override
    public void addSkill(CreateSkillRequest createSkillRequest) {
        Skill skill = this.modelMapperService.forRequest().map(createSkillRequest, Skill.class);
        skillRepository.save(skill);
    }

    @Override
    public List<GetAllSkillsResponse> getSkills() {
        List<Skill> skills = skillRepository.findAll();
        //TODO: If required, call domain, get the result.
        return skills.stream().map(skill -> this.modelMapperService.forResponse().map(skill, GetAllSkillsResponse.class))
                .collect(Collectors.toList());
    }
}
