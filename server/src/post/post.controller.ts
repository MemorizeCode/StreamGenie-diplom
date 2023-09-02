import { Controller, Post, Req,Get, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('/api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/getposts')
  async getposts(@Req() req) {
    let {userId} = req.body
    let post = this.postService.getAllPostUser(userId)
    return post
  }

  @Get("/getpost/:id")
  async getpost(@Param() param){
    let {id} = param
    return this.postService.getCurrentPost(Number(id))
  }

  @Post("/setlike")
  async setlike(@Req() req){
    let {postId} = req.body
    let user = req.user
    let userId = user.id
    return this.postService.setLikePost(userId,postId)
  }

  
  @Post("/setcoment")
  async setcoment(@Req() req){
    let {postId,text} = req.body
    let user = req.user
    let userId = user.id
    return this.postService.setCommentPost(userId,postId,text)
  }
 
  @Post("/deletecoment")
  async deletecoment(@Req() req){
    let {postId,idComent} = req.body
    let user = req.user
    let userId = user.id
    return this.postService.deleteCommentPost(userId,postId,idComent)
  }


  @Post("/createpost")
  async createpost(@Req() req){
    let {text,title} = req.body
    let user = req.user
    let userId = user.id
    let post = this.postService.createPost(userId,text,title)
    return post
  }

  @Post("/editpost")
  async editpost(@Req() req){
    let {text,title,postId} = req.body
    let user = req.user
    let userId = user.id
    let post = this.postService.editPost(userId,postId,text,title)
    return post
  }

  @Post("/deletepost")
  async deletepost(@Req() req){
    let {postId} = req.body
    let user = req.user
    let userId = user.id
    let post = this.postService.deletePost(userId,postId)
    return post
  }
}
