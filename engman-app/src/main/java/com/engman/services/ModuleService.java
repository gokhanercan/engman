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
//@Service
@AnonymousAllowed
@BrowserCallable
@Route
//@AllArgsConstructor
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

        this.moduleHost = new ModuleHost();

        //region Module Persistency sync
        List<ModuleBase> runtimeModules = moduleHost.getModules();
        Optional<ModuleInfoContainerM> moduleContainer = moduleRepo.findById("1");
        if(!moduleContainer.isPresent()){
            moduleContainer = Optional.of(new ModuleInfoContainerM());
            Map<String,ModuleInfoM> modulesMap = new HashMap<>();
            for (ModuleBase module : runtimeModules) {
                String name = module.getName();
                modulesMap.put(name,toDefaultModuleInfoM(module));
            }
            moduleContainer.get().setModules(modulesMap);
            moduleRepo.save(moduleContainer.get());
        }
        else{
            boolean isAnyNewModule = false;
            Map<String,ModuleInfoM> modulesMap = moduleContainer.get().getModules();
            for (ModuleBase module : runtimeModules) {
                String name = module.getName();
                ModuleInfoM infoM =moduleContainer.get().getModules().getOrDefault(name,null);
                if(infoM == null){
                    isAnyNewModule = true;
                    modulesMap.put(name, toDefaultModuleInfoM(module));
                }
            }
            if(isAnyNewModule){
                moduleContainer.get().setModules(modulesMap);
                moduleRepo.save(moduleContainer.get()); //TODO:Partially update the document.
            }
        }
        //endregion

        //ModuleHost activate
        //region Context
        List<DeveloperM> developerModels = resourceService.getDevelopers();
        List<SkillM> skillModels = resourceService.getSkills();
        ModuleContext ctx = new ModuleContext();
        ctx.Developers = DeveloperM.toDevelopers(developerModels);
        ctx.Skills = SkillM.toSkills(skillModels);
        //endregion

        for (ModuleInfoM moduleInfo: moduleContainer.get().getModules().values()) {
            if(moduleInfo.isEnabled()) moduleHost.toggleEnable(moduleInfo.getName(),true);
        }
        moduleHost.StartModules(ctx);

        //region test (TODO:del)
        //Update
        developerModels = DeveloperM.fromDevelopers(ctx.Developers);
        //resourceService.saveDeveloperAge(developerModels.get(0).getId(),30);
        //resourceService.saveDevelopers(developerModels);
        //endregion
    }

//    private void UpdateModuleSystem(ModuleHost moduleHost){
//        for (Module o :moduleHost.getModules()) {
//
//        }
//    }

    public ModuleInfoM toModuleInfoM(ModuleBase module){
        return new ModuleInfoM(module.getName(),module.getEnabled());
    }
    public ModuleInfoM toDefaultModuleInfoM(ModuleBase module){
        return new ModuleInfoM(module.getName(),false);
    }

    public List<ModuleInfoM> getModuleInfo() {
        //serve from mem.
        return moduleHost.getModules().stream().map(this::toModuleInfoM).toList();

        //get from db all the time.
        //return new ArrayList<>(moduleRepo.findById("1").get().getModules().values());
    }
    public List<ModuleInfoM> toggleEnable(String moduleName, boolean value) throws InterruptedException {
        Thread.sleep(500);

        moduleHost.toggleEnable(moduleName, value);

        //TODO: Call db.

        return getModuleInfo();
    }
    public ModuleInfoM mapToModel(ModuleBase module){
        return new ModuleInfoM(module.getName(),module.getEnabled());
    }
}