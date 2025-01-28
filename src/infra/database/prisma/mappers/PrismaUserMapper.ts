import { Prisma, User as PrismaUser, $Enums } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entities/UniqueEntityId';
import { User } from 'src/modules/users/domain/entities/User';
import { EnumUserRole } from 'src/modules/users/domain/enums/EnumUserRole';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        year: raw.year,
        role: raw.role as unknown as EnumUserRole,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      year: user.year,
      role: this.mapEnumUserRoleToPrisma(user.role),
    };
  }
  static mapEnumUserRoleToPrisma(role: EnumUserRole): $Enums.UserRole {
    switch (role) {
      case EnumUserRole.FINANCEIRO:
        return 'FINANCEIRO';
      case EnumUserRole.RATO_CAMERA:
        return 'RATO_CAMERA';
      case EnumUserRole.REGULAR:
        return 'REGULAR';
      case EnumUserRole.BIXO:
        return 'BIXO';
      case EnumUserRole.ADMINISTRADOR:
        return 'ADMINISTRADOR';
      default:
        return 'REGULAR';
    }
  }
}
