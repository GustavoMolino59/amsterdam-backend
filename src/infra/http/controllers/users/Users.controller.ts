import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { RegisterUserUseCase } from 'src/modules/users/application/use-cases/RegisterUser';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/ZodValidationPipes';
import { UserAlredyExistsError } from 'src/modules/users/application/errors/UserAlredyExistsError';
import { AuthenticateUsersUseCase } from 'src/modules/users/application/use-cases/AuthenticateUser';
import { Public } from 'src/infra/auth/public';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  year: z.number(),
});
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/users')
export class UserController {
  constructor(
    private registerUser: RegisterUserUseCase,
    private authenticateUser: AuthenticateUsersUseCase,
  ) {}

  @Post('/create')
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async create(@Body() body: CreateAccountBodySchema) {
    const { name, email, password, year } = body;

    const result = await this.registerUser.execute({
      name,
      email,
      password,
      year,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlredyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
