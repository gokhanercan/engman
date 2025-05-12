package com.engman.core.modules;

import com.engman.core.domain.Developer;
import com.engman.core.module.ModuleBase;
import com.engman.core.module.ModuleContext;


public class DORAModule extends ModuleBase {

    public void onAppStart(){
        System.out.println("TrueColorsModule.onAppStart");
    }

    @Override
    protected void onAfterModuleEnable() {
        super.onAfterModuleEnable();
        //
    }

     @Override
    public void onModuleInstall(ModuleContext context) {
        super.onModuleInstall(context);

         for (Developer d: context.Developers) {
             d.DefineField("Happiness");        //add data type.
         }
    }
}