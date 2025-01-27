package com.engman.modules;

import com.engman.core.domain.feeds.Developer;
import com.engman.module.ModuleBase;
import com.engman.module.ModuleContext;

import java.util.ArrayList;
import java.util.List;

//
public class ModuleHost {
    public ModuleHost() {
        Modules = DiscoverModules();
    }

    private List<ModuleBase> Modules = new ArrayList<>();

    public List<ModuleBase> DiscoverModules(){
        return new ArrayList<>(){{
            add(new TrueColorsModule());
        }};
    }

    public void StartModules(){
        ModuleContext ctx = new ModuleContext();
        ctx.Developers = new ArrayList<>(); //TODO: get from DB ResourceService.GetDevelopers().MapToDomain;
        ctx.Developers.add(new Developer("John Doe"));
        for (ModuleBase module : Modules) {
            module.onModuleInstall(ctx);
        }
        //DB.Update();
    }
}