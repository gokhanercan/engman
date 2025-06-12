package com.engman.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mapping.model.FieldNamingStrategy;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import java.util.Collections;

@Configuration
public class MongoConfig {

    @Bean
    public MongoMappingContext mongoMappingContext(MongoCustomConversions conversions) {
        MongoMappingContext context = new MongoMappingContext();
        context.setAutoIndexCreation(true);
        context.setSimpleTypeHolder(conversions.getSimpleTypeHolder());
//        context.setMapKeyDotReplacement("_"); // Replace '.' with '_'
        return context;
    }
}