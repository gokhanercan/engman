package com.engman.services;

import com.engman.models.*;
import com.engman.repo.DeveloperRepo;
import com.engman.repo.SkillsRepo;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

//'Open Session In View' pattern

//Auto Mappers
    //ModelMappers (class based)
    //MapStruct (deep copy/clone, interface-based)
    //CopyBean (spring buit-in, no deep copy supp.)

@AnonymousAllowed
@BrowserCallable
@Route
public class ResourcesService {

    @Autowired
    private SkillsRepo skillsRepo;

    @Autowired
    private DeveloperRepo developerRepo;

    private SkillM aws = new SkillM(UUID.randomUUID(),"AWS","Cloud platform",10,"gold");
    private SkillM java = new SkillM(UUID.randomUUID(),"Java","Java lang",10,"skyblue");
    private SkillM dotnet = new SkillM(UUID.randomUUID(),"dotnet",".NET is a Microsoft framework for building and running applications on web, mobile, desktop, and cloud platforms.",10,"tomato");
    private SkillM azure = new SkillM(UUID.randomUUID(),"Azure","Azure is Microsoft's cloud platform for building, deploying, and managing applications globally.",10,"blue");
    private SkillM python = new SkillM(UUID.randomUUID(),"Python","Python lang.",10,"green");

    private DeveloperM gokhan = new DeveloperM("Gökhan Ercan",41,
                new ArrayList<>(
                        Arrays.asList(
                                new SkillLevelM(dotnet, 80, 90),
                                new SkillLevelM(java, 50, 70),
                                new SkillLevelM(aws, 0, 40),
                                new SkillLevelM(azure, 50, 80),
                                new SkillLevelM(python, 70, 80)
                        )
                )
            );
    private DeveloperM devops  = new DeveloperM("DevOps Guy1",25,
        new ArrayList<>(Arrays.asList(new SkillLevelM(aws, 80, 90)))
    );
    private DeveloperM datascientist = new DeveloperM("Data scientist",26,
            new ArrayList<>(
                    Arrays.asList(
                            new SkillLevelM(python, 50, 80)
                    )
            )
        );
    private DeveloperM oldman = new DeveloperM("Old Man",35,
        new ArrayList<>(
                Arrays.asList(
                        new SkillLevelM(java, 90, 100),
                        new SkillLevelM(aws, 80, 100)
                )
        )
    );
    private DeveloperM kerem = new DeveloperM("Kerem Yılmaz",28,
        new ArrayList<>(
                Arrays.asList(
                        new SkillLevelM(dotnet, 30, 60),
                        new SkillLevelM(java, 20, 50)
                )
        )
    );

    private List<SkillM> _Skills = new ArrayList<>(Arrays.asList(
        aws, java, dotnet, python, azure
    ));

    private List<ProjectM> _Projects = new ArrayList<>(Arrays.asList(
        new ProjectM(1L,"Project 1","Cloud-based java project",2000000,
                new ArrayList<>(Arrays.asList(
                        new SkillLevelM(aws, 80, 100),
                        new SkillLevelM(java, 70, 90)
                )),
                new ArrayList<>(Arrays.asList(gokhan, devops, kerem))
        ),
        new ProjectM(2L,"Project 2","Data science",1000000,
                new ArrayList<>(Arrays.asList(
                        new SkillLevelM(python, 50, 80)
                )
        ),
            new ArrayList<>(Arrays.asList(datascientist))
        ),
            new ProjectM(3L,"Project 3","ECommerceproject",500000,
                new ArrayList<>(Arrays.asList(
                        new SkillLevelM(azure, 50, 70),
                        new SkillLevelM(dotnet, 70, 90)
                )),
                new ArrayList<>(Arrays.asList(gokhan,kerem))
        )
    ));

    private List<DeveloperM> _Devs = new ArrayList<>(Arrays.asList(gokhan, devops, datascientist, oldman, kerem));

    public List<DeveloperM> getDevelopers(){
        return developerRepo.findAll();
    }

    public List<SkillM> getSkills(){
        return skillsRepo.findAll();
    }

    public List<ProjectM> getProjects(){
        return _Projects;
    }

    public void saveDeveloper(DeveloperM dev){
        developerRepo.save(dev);
    }
    public void saveDevelopers(List<DeveloperM> devs){
        developerRepo.saveAll(devs);
    }
}