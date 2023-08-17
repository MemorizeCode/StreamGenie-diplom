import { Controller, Post, Req, Get, Param } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
constructor(private readonly videoService: VideoService){}
  @Post('/getvideos')
  async getvideo(@Req() param) {
    let {userId} = param.body
    let result = this.videoService.getvideos(Number(userId))
    return result
  }

  @Get('/getvideo/:id')
  async getvideocurrent(@Param() param) {
    let {postId} = param
    let result = this.videoService.getvideo(Number(postId))
    return result
  }

  
  @Post("/setlike")
  async setlikevideo(@Req() req){
    
  }

  
  @Post("/setcoment")
  async setcomentvideo(@Req() req){

  }


  @Post("/createvideo")
  async createpost(@Req() req){

  }

  @Post("/editvideo")
  async editvideo(@Req() req){

  }

  @Post("/deletevideo")
  async deletevideo(@Req() req){

  }
}
