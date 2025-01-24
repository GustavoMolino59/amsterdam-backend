import { Module } from '@nestjs/common';
import { Encrypter } from 'src/modules/cryptography/domain/encrypter';
import { JwtEncrypter } from './JwtEncrypter';
import { HashGenerator } from 'src/modules/cryptography/domain/hash-generator';
import { BcryptHasher } from './BcryptHasher';
import { HashComparer } from 'src/modules/cryptography/domain/hash-comparer';

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
