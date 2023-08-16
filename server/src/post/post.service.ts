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
    let isLike = await this.prisma.likePost.findMany({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    if (isLike.length > 0) {
      await this.prisma.likePost.deleteMany({
        where:{
          postId:postId,
          userId:userId
        }
      })
    } else {
      await this.prisma.likePost.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
    }
  }

  async setcoment(userId,postId,text){
    let isComent = await this.prisma.comentPost.create({
      data:{
        userId:userId,
        postId:postId,
        text:text
      }
    })
  }

  async deletecoment(userId,postId){
    let user = await this.prisma.user.findUnique({
      where:{
        id:userId
      }
    })
    let post = await this.prisma.comentPost.findUnique({
      where:{
        id:postId
      }
    })
    if(user.id == post.userId || user.role == "ADMIN"){
      await this.prisma.comentPost.update({
        where:{
          id:postId
        },
        data:{
          delete:true
        }
      })
    }
    else{
      return "У вас нет прав"
    }
  }


  async create(text,title,userId){
    let post = this.prisma.post.create({
      data:{
        text:text,
        title:title,
        userId:userId
      }
    })
    return post
  }


  async edit(text,title,userId,postId){
    let user = await this.prisma.user.findUnique({
      where:{
        id:userId
      }
    })
    let post = await this.prisma.comentPost.findUnique({
      where:{
        id:postId
      }
    })
    if(user.id == post.userId || user.role == 'ADMIN'){
      //можно
      let newPost = await this.prisma.post.update({
        where:{
          id:postId
        },
        data:{
          text:text,
          title:title
        }
      })
    }
    return "У вас нет прав"
  }
}
