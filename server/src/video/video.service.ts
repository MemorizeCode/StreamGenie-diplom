import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}
  async getvideos(id) {
    // let videos = this.prisma

    return;
  }

  async getvideo(id) {
    // let videos = this.prisma

    return;
  }
}
