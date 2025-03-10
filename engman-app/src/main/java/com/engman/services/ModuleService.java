package com.engman.services;

import com.engman.core.domain.Developer;
import com.engman.core.module.ModuleBase;
import com.engman.core.module.ModuleContext;
import com.engman.core.module.ModuleHost;
import com.engman.models.DeveloperM;
import com.engman.models.ModuleInfoM;
import com.engman.models.SkillM;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.ArrayList;
import java.util.List;

@ApplicationScope
@Component
@AnonymousAllowed
@BrowserCallable
@Route
public class ModuleService {

    @Autowired
    private final ResourcesService resourceService;

    private ModuleHost moduleHost;

    @Autowired
    public ModuleService(ResourcesService resourceService) {
        this.resourceService = resourceService;

        //Models
        List<DeveloperM> developerModels = resourceService.getDevelopers();
        List<SkillM> skillModels = resourceService.getSkills();

        //Context (core)
        ModuleContext ctx = new ModuleContext();
        ctx.Developers = DeveloperM.toDevelopers(developerModels);
        ctx.Skills = SkillM.toSkills(skillModels);

        moduleHost = new ModuleHost();
        moduleHost.StartModules(ctx);

        //Map to Model
        developerModels = DeveloperM.fromDevelopers(ctx.Developers);

        //Update
//        resourceService.saveDevelopers(developerModels);
    }

    public List<ModuleInfoM> getModuleInfo() {
        List<ModuleBase> modules = moduleHost.getModules();
        List<ModuleInfoM> modModels = new ArrayList<>();
        for (ModuleBase module : modules) {
            modModels.add(mapToModel(module));
        }
        //Temp fake models
//        modModels.add(new ModuleInfoM("Scrum",false));
//        modModels.add(new ModuleInfoM("Kanban",true));
//        modModels.add(new ModuleInfoM("RoleTypes",false));
//        modModels.add(new ModuleInfoM("SkillsEnhancer",true));
//        modModels.add(new ModuleInfoM("LinkedInPofile",false));
//        modModels.add(new ModuleInfoM("Drive",false));
        modModels.add(new ModuleInfoM("Flow",false));
        return modModels;
    }
    public List<ModuleInfoM> toggleEnable(String moduleName, boolean value) throws InterruptedException {
        Thread.sleep(500);
        moduleHost.toggleEnable(moduleName, value);
        return getModuleInfo();
    }
    public ModuleInfoM mapToModel(ModuleBase module){
        return new ModuleInfoM(module.getName(),module.getEnabled());
    }
}