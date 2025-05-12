package com.engman.repo;

import com.engman.models.ModuleInfoContainerM;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ModuleRepo extends MongoRepository<ModuleInfoContainerM, String> {

}