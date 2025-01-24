import { UseCaseError } from '../UseCaseErrors';

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Not allowed');
  }
}
