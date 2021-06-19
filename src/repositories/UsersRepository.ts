import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { User } from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
    createAndSave(username: string, email: string) {
        const user = new User();
        user.username = username;
        user.email = email;
        return this.manager.save(user);
    }

    findByEmail(email: string) {
        return this.findOne({ email });
    }

    findById(id: number) {
        return this.findOne({ id });
    }
}

export { UsersRepository };
