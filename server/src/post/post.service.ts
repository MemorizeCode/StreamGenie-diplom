import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async getposts(id) {
    let user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        login: true,
        uniqLogin: true,
        isOnline: true,
      },
    });
    let posts = await this.prisma.post.findMany({
      where: {
        userId: id,
        delete: false,
      },
    });
    return [user, posts];
  }

  async getpost(id) {
    let post = await this.prisma.post.findUnique({
      where: {
        id: id,
        delete: false,
      },
    });

    let user = await this.prisma.user.findUnique({
      where: {
        id: post.userId,
      },
      select: {
        login: true,
        uniqLogin: true,
        isOnline: true,
      },
    });
    return [user, post];
  }

  async setlike(userId, postId) {
    return "Like"
  }

  async setcoment(userId,postId,text){

  }

  async deletecoment(userId,postId,idComent){

  }


  async create(text,title,userId){

  }


  async edit(text,title,userId,postId){

  }
  async deletepost(userId,postId){
    
  }
}
