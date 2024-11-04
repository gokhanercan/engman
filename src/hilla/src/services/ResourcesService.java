package services;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import models.DeveloperM;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@AnonymousAllowed
@BrowserCallable
public class ResourcesService {
    public List<DeveloperM> getDevelopers(){
        List<DeveloperM> devs = new ArrayList<>(Arrays.asList(
            new DeveloperM("Gökhan Ercan",40,
                new ArrayList<>(Arrays.asList(
                    new models.SkillM("Azure","Azure is Microsoft's cloud platform for building, deploying, and managing applications globally."),
                    new models.SkillM(".NET",".NET is a Microsoft framework for building and running applications on web, mobile, desktop, and cloud platforms.")
                ))
            ),
            new DeveloperM("Dev2",null,
                new ArrayList<>(Arrays.asList(new models.SkillM("AWS","")))
            ),
            new DeveloperM("Dev3",null,
                new ArrayList<>(Arrays.asList(new models.SkillM("JS","")))
            ),
            new DeveloperM("Dev4",null,
                new ArrayList<>(Arrays.asList(new models.SkillM("Java","")))
            )
        ));
        //TODO: Call repository here..
        return devs;
    }

//    public List<SkillM> getSkills(){
//        List<SkillM> skills = new ArrayList<>(Arrays.asList(
//                new SkillM("Java","Programming language")
//        ));
//        //TODO: Call repository here..
//        return skills;
//    }
}