import { Controller, Post, Req,Get, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('/api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/getposts')
  async getposts(@Req() param) {
    let {id} = param.body
    let post = this.postService.getposts(Number(id))
    return post
  }

  @Get("/getpost/:id")
  async getpost(@Param() param){
    let {id} = param
    return this.postService.getpost(Number(id))
  }

  @Post("/setlike")
  async setlike(@Req() req){
    let {userId,postId} = req.body
    return this.postService.setlike(Number(userId),Number(postId))
  }

  
  @Post("/setcoment")
  async setcoment(@Req() req){
    let {userId,postId,text} = req.body
    return this.postService.setcoment(Number(userId),Number(postId),text)
  }

  @Post("/deletecoment")
  async deletecoment(@Req() req){
    let {userId,postId} = req.body
    return this.postService.deletecoment(Number(userId),Number(postId))
  }


  @Post("/createpost")
  async createpost(@Req() req){
    let {text,title,userId} = req.body
    let post = this.postService.create(text,title,userId)
    return post
  }

  @Post("/editpost")
  async editpost(@Req() req){
    let {text,title,userId,postId} = req.body
    let post = this.postService.edit(text,title,Number(userId),Number(postId))
    return post
  }
}
