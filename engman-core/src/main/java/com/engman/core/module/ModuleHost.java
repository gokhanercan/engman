package com.engman.core.module;

import com.engman.core.modules.TrueColorsModule;

import java.util.ArrayList;
import java.util.List;


public class ModuleHost {
    public ModuleHost() {
        _Modules = DiscoverModules();
    }

    private List<ModuleBase> _Modules = new ArrayList<>();

    public List<ModuleBase> DiscoverModules(){
        return new ArrayList<>(){{
            add(new TrueColorsModule());        //Currently hardcoded.
        }};
    }

    public List<ModuleBase> getModules() {
        return _Modules;
    }

    public void StartModules(ModuleContext ctx){
//        ctx.Developers = new ArrayList<>(); //TODO: get from DB ResourceService.GetDevelopers().MapToDomain;
//        ctx.Developers.add(new Developer("John Doe"));
        for (ModuleBase module : _Modules) {
            module.onModuleInstall(ctx);
        }
        //DB.Update();
    }
}