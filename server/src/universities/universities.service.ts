import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UniversitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.university_rankings.findMany({
      orderBy: {
        overall_score: 'desc',
      },
    });
  }

  async getTopUniversities(limit: number) {
    if (isNaN(limit) || limit <= 0) {
      throw new Error('Limit must be a positive number');
    }

    return this.prisma.university_rankings.findMany({
      take: limit,
      orderBy: {
        overall_score: 'desc',
      },
    });
  }
}
