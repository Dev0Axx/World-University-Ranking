import { Module } from '@nestjs/common';
import { UniversitiesModule } from './universities/universities.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [UniversitiesModule, PrismaModule],
})
export class AppModule {}
