import { Entity } from 'src/core/entities/Entity';
import { UniqueEntityID } from 'src/core/entities/UniqueEntityId';
import { EnumUserRole } from '../enums/EnumUserRole';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  year: number;
  role?: EnumUserRole;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get year() {
    return this.props.year;
  }

  get role() {
    return this.props.role;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(props, id);

    return user;
  }
}
