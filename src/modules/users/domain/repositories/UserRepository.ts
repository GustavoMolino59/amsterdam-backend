import { User } from '../entities/User';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(student: User): Promise<void>;
}
