package src.data;

import dev.hilla.Endpoint;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Endpoint
public class Skill extends domain.resources.Skill implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idgenerator")
    // The initial value is to account for data.sql demo data ids
    @SequenceGenerator(name = "idgenerator", initialValue = 1000)
    public Long id;

    public Skill() {
        super("Skill name to base");
    }
}