package com.engman.services;

import com.engman.core.domain.Developer;
import com.engman.core.module.ModuleBase;
import com.engman.core.module.ModuleContext;
import com.engman.core.module.ModuleHost;
import com.engman.models.DeveloperM;
import com.engman.models.ModuleInfoM;
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
//@AnonymousAllowed
//@BrowserCallable
//@Route
public class ModuleService {

    @Autowired
    private ResourcesService resourceService;

    private ModuleHost moduleHost;

    public ModuleService() {
        List<DeveloperM> developerMS = resourceService.getDevelopers();
        //TODO: mapping
        List<Developer> devs = new ArrayList<>(){
            {
                add(new Developer("John Doe"));
            }
        };
        ModuleContext ctx = new ModuleContext();
        ctx.Developers = devs;

        moduleHost = new ModuleHost();
        moduleHost.StartModules(ctx);
    }

//    public List<ModuleInfoM> getModuleInfo() {
//         List<ModuleBase> modules = moduleHost.getModules();
//         List<ModuleInfoM> modModels = new ArrayList<>();
//            for (ModuleBase module : modules) {
//                modModels.add(new ModuleInfoM(module.getName(),true));
//            }
//        return modModels;
//    }
}
