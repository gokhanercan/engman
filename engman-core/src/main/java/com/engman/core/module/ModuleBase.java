package com.engman.core.module;

public class ModuleBase {

    //AppEvents
    public void onAppStart(){
        //
    }
    public void onModuleInstall(ModuleContext context){
        //
    }
    public void onModuleUninstall(){
        //
    }
    public void onModuleEnable(){
        //
    }
    public void onModuleDisable(){
        //
    }

    //DomainEvents (for Modules, for vertical interception)
    public void onDeveloperAdd(Object event){
        //
    }
    public void onSkillAdd(Object event){
        //
    }
}