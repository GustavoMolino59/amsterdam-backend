import { UseCaseError } from 'src/core/errors/UseCaseErrors';

export class UserAlredyExistsError extends Error implements UseCaseError {
  constructor(email: string) {
    super(`User ${email} alredy exists`);
  }
}
