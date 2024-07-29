package entities.abstracts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface MainRepository<T, ID>  extends MongoRepository<T, ID> {

}
