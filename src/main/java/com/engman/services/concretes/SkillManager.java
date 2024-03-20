package com.engman.services.concretes;

import com.engman.common.utilities.mappers.ModelMapperService;
import com.engman.entities.abstracts.SkillRepository;
import com.engman.entities.concretes.Skill;
import com.engman.services.abstracts.SkillService;
import com.engman.services.requests.CreateSkillRequest;
import com.engman.services.responses.GetAllSkillsResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SkillManager implements SkillService {
    private SkillRepository skillRepository;
    private ModelMapperService modelMapperService;

    private MongoTemplate mongoTemplate;

    @Override
    public void addSkill(CreateSkillRequest createSkillRequest) {
        Skill skill = this.modelMapperService.forRequest().map(createSkillRequest, Skill.class);
        skillRepository.save(skill);
    }

    @Override
    public List<GetAllSkillsResponse> getSkills() {
        String collectionName = mongoTemplate.getCollectionName(Skill.class);
        if (!mongoTemplate.collectionExists(collectionName)){throw new RuntimeException("Collection '" + collectionName + "' does not exist");}
        List<Skill> skills = skillRepository.findAll();
        return skills.stream().map(skill -> this.modelMapperService.forResponse().map(skill, GetAllSkillsResponse.class))
                .collect(Collectors.toList());
    }
}