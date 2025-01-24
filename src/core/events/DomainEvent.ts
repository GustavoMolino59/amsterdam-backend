import { UniqueEntityID } from '../entities/UniqueEntityId';

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityID;
}
