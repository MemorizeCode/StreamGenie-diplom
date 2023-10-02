import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async sendmessages(roomId, text, userId) {
    let user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        login: true,
      },
    });

    let newMessages = await this.prisma.message.create({
      data: {
        text: text,
        userId: user.id,
        roomId: roomId,
      },
    });
    return newMessages;
  }



  async getMessages(roomId,userId) {
    //Есть ли мы в этом чате
    let accsessRoom = await this.prisma.accessRoom.findMany({
      where:{
        roomId:roomId,
        userId:userId
      }
    })
    if(accsessRoom.length == 0){
      return {message:"Доступ запрещен"}
    }
    else{
      let message = await this.prisma.message.findMany({
        where: {
          roomId: roomId,
        },
        select:{
          text:true,
          id:true,
          roomId:true,
          user:{
              select:{
                  login:true
              }
          }
        }
      });
      return message; 
    }
  }

  async deletemessages(id,userId){
    let message = await this.prisma.message.findUnique({
        where:{
            id:id
        }
    })
    let user = await this.prisma.user.findUnique({
        where:{
            id:userId.id
        }
    })
    if(message){
        if(message.userId == user.id || user.role == "ADMIN"){
            await this.prisma.message.delete({
                where:{
                    id:id
                }
            })
        }
        else{
            return "Net prav"
        }   
    }
  }




}
