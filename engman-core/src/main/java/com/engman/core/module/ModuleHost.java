package com.engman.core.module;

import com.engman.core.modules.DORAModule;
import com.engman.core.modules.KanbanModule;
import com.engman.core.modules.TrueColorsModule;

import java.util.ArrayList;
import java.util.List;


public class ModuleHost {
    public ModuleHost() {
        _Modules = DiscoverModules();
    }

    private List<ModuleBase> _Modules = new ArrayList<>();

    public List<ModuleBase> DiscoverModules(){
        return List.of(new KanbanModule(), new TrueColorsModule(), new DORAModule());     //todo: Discover automatically!
    }
    public List<ModuleBase> getModules() {
        return _Modules;
    }

    public ModuleBase getModule(String moduleName){
        for (ModuleBase module : _Modules) {
            if(module.getName().equals(moduleName)){
                return module;
            }
        }
        throw new RuntimeException("Module not found: " + moduleName);
    }
    public void toggleEnable(String moduleName, boolean value){
        ModuleBase module = getModule(moduleName);
        module.setEnable(value);
    }

    private boolean isStarted = false;
    public void StartModules(ModuleContext ctx){
//        ctx.Developers = new ArrayList<>(); //TODO: get from DB ResourceService.GetDevelopers().MapToDomain;
//        ctx.Developers.add(new Developer("John Doe"));
        for (ModuleBase module : _Modules) {
            module.onModuleInstall(ctx);
        }
        isStarted = true;
        //DB.Update();
    }
}