import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { Public } from 'src/infra/auth/public';
import { RegisterUserUseCase } from 'src/modules/users/application/use-cases/RegisterUser';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/ZodValidationPipes';
import { UserAlredyExistsError } from 'src/modules/users/application/errors/UserAlredyExistsError';
import { AuthenticateUsersUseCase } from 'src/modules/users/application/use-cases/AuthenticateUser';
import { WrongCredentialsError } from 'src/modules/users/application/errors/WrongCredentialsError';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  year: z.number(),
});
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/users')
export class UserController {
  constructor(
    private registerUser: RegisterUserUseCase,
    private authenticateUser: AuthenticateUsersUseCase,
  ) {}

  @Post('/create')
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

  @Post('/login')
  @HttpCode(200)
  @Public()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async login(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateUser.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const accessToken = result.value;

    return accessToken;
  }
}
