import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async rec(){
    let randomId = await this.prisma.post.findMany({
      select:{
        text:true,
        title:true
      },
      take:10
    })

    return randomId

  }


  async getallpost(userId){
    let postsAndUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select:{
        login:true,
        uniqLogin:true,
        post:{
          select:{
            title:true,
            text:true
          }
        }
      }
    });
    return postsAndUser
  }


  async getAllPostUser(userId: number) {
    const subscribedSubs = await this.prisma.subcribe.findMany({
      where: {
        userId: userId,
      },
      select: {
        subId: true,
      },
    });
    
  const posts = await this.prisma.post.findMany({
      where: {
        userId: {
          in: subscribedSubs.map((s) => s.subId),
        },
      },
    });
    return posts;
  }

  async getCurrentPost(id: number) {
    //Возращаем пост и некоторую инфу о создатели
    let currentPost = await this.prisma.post.findUnique({
      where: {
        id: id,
        delete: false,
      },
      include: {
        user: {
          select: {
            login: true,
            uniqLogin: true,
          },
        },
      },
    });
    if (!currentPost) {
      return 'Пост не найден. Возможно он был, а возможо и нет';
    }
    //Прибавляем +1 просмотр к посту
    let upDateWatchPost = await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        countWatch: {
          increment: 1,
        },
      },
    });
    //Прибавляем +1 просмотр к общему просмотров у юзера
    let upDateWathUser = await this.prisma.user.update({
      where: {
        id: currentPost.userId,
      },
      data: {
        countWatch: {
          increment: 1,
        },
      },
    });
    return [currentPost, upDateWatchPost, upDateWathUser];
  }

  async setLikePost(userId: number, postId: number) {
    let isPost = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!isPost) {
      return 'Пост не найден';
    }
    let isLike = await this.prisma.likePost.findMany({
      where: {
        userId: userId,
        postId: postId,
      },
    });
    if (isLike.length == 0) {
      await this.prisma.likePost.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
      await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          countLikes: {
            increment: 1,
          },
        },
      });
    } else {
      await this.prisma.likePost.deleteMany({
        where: {
          userId: userId,
          postId: postId,
        },
      });
      await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          countLikes:{
            decrement:1
          }
        },
      });
    }
  }

  async setCommentPost(userId: number, postId: number, text: string) {
    let isPost = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if(!isPost){
      return "Пост не найден"
    }else{
      await this.prisma.comentPost.create({
        data:{
          userId:userId,
          postId:postId,
          text:text
        }
      })
      await this.prisma.post.update({
        where:{
          id:postId
        },
        data:{
          countComent:{
            increment:1
          }
        }
      })
    }
  }

  async deleteCommentPost(userId: number, postId: number, idComent: number) {
    let isPost = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if(!isPost){
      return "Пост не найден"
    }
    let isComent = await this.prisma.comentPost.findUnique({
      where:{
        id:idComent,
        delete:false
      }
    })
    if(isComent){
      await this.prisma.comentPost.update({
        where:{
          id:idComent
        },
        data:{
          delete:true
        }
      })
      await this.prisma.post.update({
        where:{
          id:postId
        },
        data:{
          countComent:{
            decrement:1
          }
        }
      })
    }
    
    else{
    return "Коментарий не найден"
    }
  }

  async createPost(userId: number, text: string, title: string) {
    let newPost = await this.prisma.post.create({
      data: {
        userId: userId,
        text: text,
        title: title,
      },
    });
    let upDateCountPostsUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        countPost: {
          increment: 1,
        },
      },
    });
    return [newPost, upDateCountPostsUser];
  }

  async editPost(userId: number, postId: number, text: string, title: string) {
    let currentPost = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!currentPost) {
      return 'Пост не найден';
    }
    if (currentPost.userId == userId) {
      await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          text: text,
          title: title,
        },
      });
    }
  }

  async deletePost(user, postId: number) {
    let currentPost = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    let currentUser = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (currentPost) {
      if (currentPost.userId == currentUser.id || currentUser.role == 'ADMIN') {
        await this.prisma.post.updateMany({
          where: {
            id: postId,
          },
          data: {
            delete: true,
          },
        });
        await this.prisma.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            countPost: {
              decrement: 1,
            },
          },
        });
      } else {
        return 'Вы не админ/Не ваш пост';
      }
    } else {
      return 'Пост не найден';
    }
  }
}
