import { UseCaseError } from 'src/core/errors/UseCaseErrors';

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super(`Credentials are not valid.`);
  }
}
