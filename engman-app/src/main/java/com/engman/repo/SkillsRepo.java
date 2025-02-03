package com.engman.repo;
import com.engman.models.SkillM;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SkillsRepo extends MongoRepository<SkillM, UUID> {
//    SkillM findByName(String Name);
}