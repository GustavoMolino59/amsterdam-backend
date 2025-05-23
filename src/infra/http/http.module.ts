import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/Database.module';
import { UserController } from './controllers/users/Users.controller';
import { CryptographyModule } from '../cryptography/Cryptography.module';
import { RegisterUserUseCase } from 'src/modules/users/application/use-cases/RegisterUser';
import { AuthenticateUsersUseCase } from 'src/modules/users/application/use-cases/AuthenticateUser';
import { AuthController } from './controllers/users/Auth.controller';
/* Module Responsável pelo gerenciamento HTTP da aplicação*/

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [UserController, AuthController],
  providers: [RegisterUserUseCase, AuthenticateUsersUseCase],
})
export class HttpModule {}
