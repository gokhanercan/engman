package com.engman.repo;

import com.engman.core.module.ModuleBase;
import com.engman.models.ModuleInfoContainerM;
import com.engman.models.ModuleInfoM;
import org.hibernate.dialect.function.DB2SubstringFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.*;


@Repository
public interface ModuleRepo extends MongoRepository<ModuleInfoContainerM, String> {

    static String DOCUMENT_ID = "1";

    default void OverwriteModules(List<ModuleInfoM> moduleInfo){
        ModuleInfoContainerM container = new ModuleInfoContainerM();
        for (ModuleInfoM mInfo : moduleInfo) {
            container.getModules().put(mInfo.getName(),mInfo);
        }
        save(container);
    }

    default boolean hasDocument(){
        return existsById(ModuleRepo.DOCUMENT_ID);
    }
    default Optional<ModuleInfoContainerM> getModules(){
        return findById(ModuleRepo.DOCUMENT_ID);
    }

//    @Autowired
//    private MongoTemplate mongoTemplate;
//
//    public void updateModuleName(String id, String newName) {
//        Query query = new Query(Criteria.where("id").is(id));
//        Update update = new Update().set("name", newName);
//        mongoTemplate.updateFirst(query, update, ModuleInfoContainerM.class);
//    }

}