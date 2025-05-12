package com.engman.services;

import com.engman.core.module.ModuleBase;
import com.engman.core.module.ModuleContext;
import com.engman.core.module.ModuleHost;
import com.engman.models.DeveloperM;
import com.engman.models.ModuleInfoContainerM;
import com.engman.models.ModuleInfoM;
import com.engman.models.SkillM;
import com.engman.repo.ModuleRepo;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.*;

@ApplicationScope
@AnonymousAllowed
@BrowserCallable
@Route
public class ModuleService {

    @Autowired
    private final ResourcesService resourceService;

    @Autowired
    private ModuleRepo moduleRepo;

    private ModuleHost moduleHost;

    @Autowired
    public ModuleService(ResourcesService resourceService, ModuleRepo moduleRepo) {
        this.resourceService = resourceService;
        this.moduleRepo = moduleRepo;

        //Module System
        this.moduleHost = new ModuleHost();
        SyncModuleSystem(moduleHost);

        //ModuleHost activate
        //region Context
        List<DeveloperM> developerModels = resourceService.getDevelopers();
        List<SkillM> skillModels = resourceService.getSkills();
        ModuleContext ctx = new ModuleContext();
        ctx.Developers = DeveloperM.toDevelopers(developerModels);
        ctx.Skills = SkillM.toSkills(skillModels);
        //endregion
        moduleHost.StartModules(ctx);

        //region Test DB Updates (TODO:del)
        //Update
        developerModels = DeveloperM.fromDevelopers(ctx.Developers);
        //resourceService.saveDeveloperAge(developerModels.get(0).getId(),30);
        //resourceService.saveDevelopers(developerModels);
        //endregion
    }

    /*
    Syncs the in memory module system with the database in both ways.
     */
    private void SyncModuleSystem(ModuleHost moduleHost){

        //Sync (Memory->DB)
        List<ModuleBase> runtimeModules = moduleHost.getModules();
        Optional<ModuleInfoContainerM> moduleContainer = moduleRepo.getModules();
        if(!moduleContainer.isPresent()){
            moduleRepo.OverwriteModules(toModuleInfoMs(moduleHost.getModules()));
        }
        else{
            boolean isAnyNewModuleDiscovered = false;
            Map<String,ModuleInfoM> modulesMap = moduleContainer.get().getModules();
            for (ModuleBase module : runtimeModules) {
                String name = module.getName();
                ModuleInfoM infoM =moduleContainer.get().getModules().getOrDefault(name,null);
                if(infoM == null){
                    isAnyNewModuleDiscovered = true;
                    modulesMap.put(name, toDefaultModuleInfoM(module));
                }
            }
            if(isAnyNewModuleDiscovered)  moduleRepo.OverwriteModules(toModuleInfoMs(moduleHost.getModules()));
        }

        //Sync (DB->Memory)
        for (ModuleInfoM moduleInfo: moduleContainer.get().getModules().values()) {
            if(moduleInfo.isEnabled()) moduleHost.toggleEnable(moduleInfo.getName(),true);
        }
    }

    public List<ModuleInfoM> getModuleInfo() {
        //serve from the memory
        return toModuleInfoMs(moduleHost.getModules());

        //get from db
        //return new ArrayList<>(moduleRepo.findById("1").get().getModules().values());
    }
    public List<ModuleInfoM> toggleEnable(String moduleName, boolean value) throws InterruptedException {
        Thread.sleep(500);
        moduleHost.toggleEnable(moduleName, value);
        return getModuleInfo();
    }

    //region Mapping
    public ModuleInfoM toModuleInfoM(ModuleBase module){
        return new ModuleInfoM(module.getName(),module.getEnabled());
    }
    public ModuleInfoM toDefaultModuleInfoM(ModuleBase module){
        return new ModuleInfoM(module.getName(),false);
    }
    public List<ModuleInfoM> toModuleInfoMs(List<ModuleBase> modules){
        return modules.stream().map(this::toModuleInfoM).toList();
    }
    //endregion

}