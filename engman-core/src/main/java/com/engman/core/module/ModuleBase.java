package com.engman.core.module;


import com.engman.core.domain.Developer;

public class ModuleBase {

    public String getName(){
        return this.getClass().getSimpleName().replace("Module", "");
    }

    private boolean _isEnabled = false;
    public boolean getEnabled(){
        return _isEnabled;
    }
    public void setEnable(boolean value){
        _isEnabled = value;
        if (_isEnabled){
            onAfterModuleEnable();
        } else {
            onAfterModuleDisable();
        }
    }

    //Field Helpers
    public void defineField(String name, Developer dev){
        dev.defineField(name, this.getName());
    }

    //AppEvents
    public void onAppStart(){
        //
    }
    protected void onModuleInstall(ModuleContext context){
        //
    }
    protected void onModuleUninstall(){
        //
    }
    protected void onAfterModuleEnable(){
        //
    }
    protected void onAfterModuleDisable(){
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