import { Controller, Post, Req,Get, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('/api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/getposts')
  async getposts(@Req() req) {
    let {userId} = req.body
    let post = this.postService.getposts(Number(userId))
    return post
  }

  @Get("/getpost/:id")
  async getpost(@Param() param){
    let {id} = param
    return this.postService.getpost(Number(id))
  }

  @Post("/setlike")
  async setlike(@Req() req){
    let {postId} = req.body
    let userId = req.user
    return this.postService.setlike(Number(userId.id),Number(postId))
  }

  
  @Post("/setcoment")
  async setcoment(@Req() req){
    let {postId,text} = req.body
    let userId = req.user
    return this.postService.setcoment(Number(userId.id),Number(postId),text)
  }
 
  @Post("/deletecoment")
  async deletecoment(@Req() req){
    let {postId,idComent} = req.body
    let userId = req.user
    return this.postService.deletecoment(Number(userId.id),Number(postId),Number(idComent))
  }


  @Post("/createpost")
  async createpost(@Req() req){
    let {text,title} = req.body
    let userId = req.user
    let post = this.postService.create(text,title,userId.id)
    return post
  }

  @Post("/editpost")
  async editpost(@Req() req){
    let {text,title,postId} = req.body
    let userId = req.user
    let post = this.postService.edit(text,title,Number(userId.id),Number(postId))
    return post
  }

  @Post("/deletepost")
  async deletepost(@Req() req){
    let {postId} = req.body
    let userId = req.user
    let post = this.postService.deletepost(Number(userId.id),Number(postId))
    return post
  }
}
