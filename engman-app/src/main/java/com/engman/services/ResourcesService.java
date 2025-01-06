package com.engman.services;

import com.engman.models.DeveloperM;
import com.engman.models.ProjectM;
import com.engman.models.SkillLevelM;
import com.engman.models.SkillM;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@AnonymousAllowed
@BrowserCallable
public class ResourcesService {

//    private final DeveloperRepository developerRepository;
//    private final SkillRepository skillRepository;
    //private final ProjectRepository projectRepo;

//    SkillRepository skillRepository, ProjectRepository projectRepository

//    @Autowired
//    public ResourcesService(ProjectRepository projectRepo) {
//        //this.projectRepo = projectRepo;
//    }

    public ResourcesService() {
    }

    //Project  ->SkillLevel->Skill
    //Developer->SkillLevel->Skill

    private SkillM aws = new SkillM("AWS","Cloud platform",10,"gold");
    private SkillM java = new SkillM("Java","Java lang",10,"skyblue");
    private SkillM dotnet = new SkillM("dotnet",".NET is a Microsoft framework for building and running applications on web, mobile, desktop, and cloud platforms.",10,"tomato");
    private SkillM azure = new SkillM("Azure","Azure is Microsoft's cloud platform for building, deploying, and managing applications globally.",10,"blue");
    private SkillM python = new SkillM("Python","Python lang.",10,"green");

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
        new ProjectM(1L,"Project 2","Data science",1000000,
                new ArrayList<>(Arrays.asList(
                        new SkillLevelM(python, 50, 80)
                )
        ),
            new ArrayList<>(Arrays.asList(datascientist))
        ),
            new ProjectM(1L,"Project 3","ECommerceproject",500000,
                new ArrayList<>(Arrays.asList(
                        new SkillLevelM(azure, 50, 70),
                        new SkillLevelM(dotnet, 70, 90)
                )),
                new ArrayList<>(Arrays.asList(gokhan,kerem))
        )
    ));

    private List<DeveloperM> _Devs = new ArrayList<>(Arrays.asList(gokhan, devops, datascientist, oldman, kerem));

//    @Autowired
//    MyRepo myRepo;
//    public ResourcesService(MyRepo myRepo) {
//        this.myRepo = myRepo;
//    }

    public List<DeveloperM> getDevelopers(){
        return _Devs;
    }

    public List<SkillM> getSkills(){
        return _Skills;
    }

    public List<ProjectM> getProjects(){
        return _Projects;
    }
}