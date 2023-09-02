import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  
  async getAllPostUser(userId:number){
    let postsAndUser = await this.prisma.user.findUnique({
      where:{
        id:userId
      },
      select:{
        login:true,
        post:{
          select:{
            text:true,
            title:true
          }
        }
      }
    })
    return postsAndUser
  }

  async getCurrentPost(id:number){
    let currentPost = await this.prisma.post.findUnique({
      where:{
        id:id,
      },
      include:{
        user:{
          select:{
            login:true,
            uniqLogin:true
          }
        }
      }
    })
    return currentPost
  }

  async setLikePost(userId:number, postId:number){
    return [userId,postId]
  }

  async setCommentPost(userId:number, postId:number, text:string){
    return [postId,text,userId]
  }

  async deleteCommentPost(userId:number, postId:number,idComent:number){
    return [postId,idComent,userId]
  }

  async createPost(userId:number,text:string,title:string){
    return [text,title,userId]
  }

  async editPost(userId:number,postId:number,text:string,title:string){
    return [userId,text,title,postId]
  }

  async deletePost(userId:number,postId:number){
    return [userId,postId]
  }
}
