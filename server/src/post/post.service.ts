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
    if (post) {
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
    } else {
      return { message: 'Пост не най' };
    }
  }

  async setlike(userId, postId) {
    let isLike = await this.prisma.likePost.findMany({
      where: {
        userId: userId,
        postId: postId,
      },
    });
    if (isLike.length > 0) {
      let deletelike = await this.prisma.likePost.deleteMany({
        where: {
          userId: userId,
          postId: postId,
        },
      });
    } else {
      let setlike = await this.prisma.likePost.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
    }
  }

  async setcoment(userId, postId, text) {
    let newComent = await this.prisma.comentPost.create({
      data: {
        text: text,
        userId:userId,
        postId:postId
      },
    });
    return newComent;
  }

  async deletecoment(userId, postId, idComent) {
    let post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    let coment = await this.prisma.comentPost.findUnique({
      where: {
        id: idComent,
      },
    });
    let user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (post.id == coment.postId) {
      if (coment.userId == userId || user.role == 'ADMIN') {
        await this.prisma.comentPost.update({
          where: {
            id: idComent,
          },
          data: {
            delete: true,
          },
        });
        let countComentPost = await this.prisma.comentPost.count({
          where: {
            postId: postId,
          },
        });
        let updateCountComents = await this.prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            // countComent:countComentPost
          },
        });
      } else {
        return 'Нету доступа';
      }
    }
  }

  async create(text, title, userId) {
    let newPost = await this.prisma.post.create({
      data: {
        text: text,
        title: title,
        userId:userId

      },
    });
    return newPost;
  }

  async edit(text, title, userId, postId) {
    let post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (post.userId == userId) {
      let editPost = await this.prisma.post.update({
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
  async deletepost(userId, postId) {
    let post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (userId == post.userId) {
      let deletepost = await this.prisma.post.delete({
        where: {
          id: postId,
        },
      });
    }
  }
}
