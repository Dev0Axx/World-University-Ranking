import { Controller, Get, Query } from '@nestjs/common';
import { UniversitiesService } from './universities.service';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get()
  async findAll() {
    return this.universitiesService.findAll();
  }

  @Get('top')
  async getTopUniversities(@Query('limit') limit = 10) {
    return this.universitiesService.getTopUniversities(Number(limit));
  }
}
