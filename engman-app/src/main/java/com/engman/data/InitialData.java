package com.engman.data;

import com.engman.models.*;

import java.util.*;

public class InitialData {

    private static SkillM aws = new SkillM("AWS","Cloud platform",10,"gold");
    private static SkillM java = new SkillM("Java","Java lang",10,"skyblue");
    private static SkillM dotnet = new SkillM("dotnet",".NET is a Microsoft framework for building and running applications on web, mobile, desktop, and cloud platforms.",10,"tomato");
    private static SkillM azure = new SkillM("Azure","Azure is Microsoft's cloud platform for building, deploying, and managing applications globally.",10,"blue");
    private static SkillM python = new SkillM("Python","Python lang.",10,"green");

    private static DeveloperM gokhan = new DeveloperM("Gökhan Ercan",41,
                new ArrayList<>(
                        Arrays.asList(
                                new SkillLevelM(dotnet, 80, 90),
                                new SkillLevelM(java, 50, 70),
                                new SkillLevelM(aws, 0, 40),
                                new SkillLevelM(azure, 50, 80),
                                new SkillLevelM(python, 70, 80)
                        )
                ),
                new HashMap<>(
                    Map.of(
                        "TrueColor", new FieldM("TrueColor","Blue", "TrueColors")
                    )
                )
            );
    private static DeveloperM devops  = new DeveloperM("DevOps Guy1",25,
        new ArrayList<>(Arrays.asList(new SkillLevelM(aws, 80, 90)))
    );
    private static DeveloperM datascientist = new DeveloperM("Data scientist",26,
            new ArrayList<>(
                    Arrays.asList(
                            new SkillLevelM(python, 50, 80)
                    )
            )
        );
    private static DeveloperM oldman = new DeveloperM("Old Man",35,
        new ArrayList<>(
                Arrays.asList(
                        new SkillLevelM(java, 90, 100),
                        new SkillLevelM(aws, 80, 100)
                )
        )
    );
    private static DeveloperM kerem = new DeveloperM("Kerem Yılmaz",28,
        new ArrayList<>(
                Arrays.asList(
                        new SkillLevelM(dotnet, 30, 60),
                        new SkillLevelM(java, 20, 50)
                )
        ),
        new HashMap<>(
                Map.of(
                    "TrueColor", new FieldM("TrueColor","Green", "TrueColors")
                )
            )
    );

    public static List<SkillM> Skills = new ArrayList<>(Arrays.asList(
        aws, java, dotnet, python, azure
    ));

    private static List<ProjectM> _Projects = new ArrayList<>(Arrays.asList(
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

    public static List<DeveloperM> Devs = new ArrayList<>(Arrays.asList(gokhan, devops, datascientist, oldman, kerem));
}
