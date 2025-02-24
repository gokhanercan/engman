package com.engman.core.modules;

import com.engman.core.domain.Developer;
import com.engman.core.module.ModuleBase;
import com.engman.core.module.ModuleContext;

/*
True Colors (Personality) theory categorized people into 4 categories and makes behavioral assumptions based on those categories.
https://en.wikipedia.org/wiki/True_Colors_(personality)
See a variant theory here: https://youtu.be/kkATORyBsug?si=cPLeSBHjWT0WrMIc
 */
public class TrueColorsModule extends ModuleBase {

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
             d.DefineField("TrueColor");        //add data type.
         }
    }
}