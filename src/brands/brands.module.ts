import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { MockBrandRepository } from './repositories/mock-brand.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BrandsController],
  providers: [
    BrandsService,
    PrismaService,
    {
      provide: 'IBrandRepository',
      useClass: MockBrandRepository,
    },
  ],
  exports: [BrandsService],
})
export class BrandsModule {}
