package engman.domain;

public class Main {
    public static void main(String[] args) {
        Environment eastdil = new Environment("Eastdil");
        Project br = new Project("BusinessRequest",100);
        Skill js = new Skill("js");
        Skill react = new Skill("react");
        Skill dotnet = new Skill("dotnet");
        Skill azure = new Skill("azure");
        Skill playwright = new Skill("playwright");
        Skill selenium = new Skill("selenium");

        eastdil.Projects.add(br);
        br.Developers.add(new Developer("Gokhan",new Skill[]{js,dotnet} ));
        br.Developers.add(new Developer("Ugur",new Skill[]{js,dotnet} ));
        br.Developers.add(new Developer("Emre",new Skill[]{js,react} ));
        br.Developers.add(new Developer("Omer",new Skill[]{selenium,dotnet} ));
        System.out.println("Hello EngMan.");
    }
}