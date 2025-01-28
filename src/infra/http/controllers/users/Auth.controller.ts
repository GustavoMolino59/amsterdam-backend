import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { Public } from 'src/infra/auth/public';
import { WrongCredentialsError } from 'src/modules/users/application/errors/WrongCredentialsError';
import { AuthenticateUsersUseCase } from 'src/modules/users/application/use-cases/AuthenticateUser';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/ZodValidationPipes';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/auth')
export class AuthController {
  constructor(private authenticateUser: AuthenticateUsersUseCase) {}

  @Post()
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

  @Get('/validate')
  validateToken() {
    return { valid: true }; // Retorna que o token é válido
  }
}
