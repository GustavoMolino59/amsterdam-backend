import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { HashComparer } from 'src/modules/cryptography/domain/hash-comparer';
import { Encrypter } from 'src/modules/cryptography/domain/encrypter';
import { Either, left, right } from 'src/core/errors/Either';
import { WrongCredentialsError } from '../errors/WrongCredentialsError';

interface AuthenticateUsersUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUsersUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticateUsersUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUsersUseCaseRequest): Promise<AuthenticateUsersUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }
    console.log(user);
    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      role: user.role,
    });

    return right({
      accessToken,
    });
  }
}
