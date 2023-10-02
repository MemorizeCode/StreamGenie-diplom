import { Body, Controller, Get,Param, Post, Req,Headers } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('/api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  //Получить сообщения команты
  @Get('/getmessages/:roomId')
  async getMessages(@Param() param, @Req() req){
    let {roomId} = param
    let userId = req.user
    let result = await this.messagesService.getMessages(Number(roomId), userId.id)
    return result
  }
  //Отправить сообщение
  @Post("/sendmessages")
  async sendmessages(@Req() req, @Headers('api') apikey){
    let {roomId,text} = req.body
    let userId = req.user
    let result = await this.messagesService.sendmessages(Number(roomId),text,userId.id)
    return result 
    
  }

  //Удалить сообщение
  @Post("/deletemessages")
  async deletemessage(@Req() req){
    let {id} = req.body
    let userId = req.user
    let result = await this.messagesService.deletemessages(Number(id), userId)
    return result
  }


}
