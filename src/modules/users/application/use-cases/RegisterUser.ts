import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserAlredyExistsError } from '../errors/UserAlredyExistsError';
import { Either, left, right } from 'src/core/errors/Either';
import { HashGenerator } from 'src/modules/cryptography/domain/hash-generator';
import { User } from '../../domain/entities/User';

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  year: number;
}

type RegisterStudentUseCaseResponse = Either<
  UserAlredyExistsError,
  {
    user: User;
  }
>;

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersReporitory: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
    year,
  }: RegisterUserUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const userWithSameEmail = await this.usersReporitory.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlredyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      year,
    });

    await this.usersReporitory.create(user);

    return right({
      user,
    });
  }
}
