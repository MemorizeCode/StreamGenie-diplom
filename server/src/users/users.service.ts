import { HttpCode, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { userMessage } from 'src/interface/user.interface';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt'
import { generateUniqueLogin } from 'src/service/generateUniqueLogin';
@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService, private jwtService: JwtService){}
  //Login
  async login(login:string,password:string):Promise<any>{
    let user = await this.prisma.user.findUnique({
      where:{
        login:login
      }
    })
    if(user){
      let hash = await bcrypt.compare(password,user.password)
      if(!hash){
        return {message:"Пароль не верный"}
      }
      if(user){
        let token = await this.jwtService.sign({
          id:user.id,
          login:login,
          role:user.role,
          prem:user.premium
        })
        return {message:"Вы вошли",obj:token}
      }
    }
    else{
      return {message:"Логина не существует"}
    }
  }

  //Register
  async register(login:string,password:string):Promise<any>{
    const user = await this.prisma.user.findUnique({
      where:{
        login:login
      }
    })
    if(user){
      return {message:"Логин уже существует"}
    }
    else{
      let hashPassword = await bcrypt.hash(password,4)
      const newUser = await this.prisma.user.create({
        data:{
          login:login,
          password:hashPassword,
          uniqLogin: new generateUniqueLogin().generate()
        }
      })
      return {message:"Вы создали аккаунт", obj:newUser}
    }
  }
  //MySubs
  async mysubs(id:number){
    const user = await this.prisma.user.findMany({
      where:{
        mypodpiski:{
          some:{
            userId:id
          }
        }
      },
    })
    return user
  }


  async mysubcribe(id:number){
    const user = await this.prisma.user.findMany({
      where:{
        myfolowers:{
          some:{
            subId:id
          }
        }
      },
    })
    return user
  }
}