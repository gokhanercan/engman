package engman.domain;

public class Skill {
    public String Name;     //React/CQRS etc..
    public String Desc;

    public Skill(String name) {
        Name = name;
    }

    //TODO:
    private int Percentage = 50; //0-100     //Assuming 100 is world max knowledge.

    //HOw easy to learn + cross relations (transitivity)
}