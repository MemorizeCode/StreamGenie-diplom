import { HttpCode, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { userMessage } from 'src/interface/user.interface';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { generateUniqueLogin } from 'src/service/generateUniqueLogin';
import axios from 'axios';
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  //Получение на кого я подписан
  async mysubs(id: number):Promise<any> {
    let subs = await this.prisma.user.findMany({
      where:{
        mypodpiski:{
          some:{
            userId:id
          }
        }
      }
    })
    if(subs.length < 1){
      return "Пользователь не найден"
    }
    else{
      return subs
    }
  }
  //Получение кто на меня подписан
  async mysubcribe(id: number):Promise<any> {
    let podpishki = await this.prisma.user.findMany({
      where:{
        myfolowers:{
          some:{
            subId:id
          }
        }
      }
    })
    if(podpishki.length < 1){
      return "Пользователь не найден"
    }
    else{
      return podpishki
    }
  }

  //My profile
  async profile(id):Promise<userMessage> {
    let result = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        login: true,
        premium: true,
        email: true,
        countPost: true,
        countVideo: true,
        countWatch: true,
        isOnline: true,
        uniqLogin: true,
      },
    });
    return {obj:result}
  }

  async profilehyjoi(id):Promise<userMessage> {
    let result = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        login: true,
        premium: true,
      },
    });
    return {obj:result}
  }

  async banuser(userId,myId):Promise<any>{
    let userIsBan = await this.prisma.bans.findMany({
      where:{
        userBanId:userId
      }
    })
    if(userIsBan.length > 0){
      return "Он уже забанен"
    }
    else{
      let banUser = await this.prisma.bans.create({
        data:{
          userBanId:userId,
          userId:myId
        }
      })
      return banUser
    }
  }

  async unbanuser(userId,myId):Promise<any>{
    let userIsBan = await this.prisma.bans.findMany({
      where:{
        userBanId:userId
      }
    })
    if(userIsBan.length <= 0){
      return "Он не забанен"
    }
    else{
      let unBanUser = await this.prisma.bans.deleteMany({
        where:{
          userBanId:userId,
          userId:myId
        }
      })
      return unBanUser
    }
  }

  async listban(id){
    let list = await this.prisma.user.findMany({
      where:{
        myBanUser:{
          some:{
            userId:id
          }
        }
      }
    })
    return list
  }

}
