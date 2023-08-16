import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {UsersService} from './users.service'
import { Request } from 'express';
import { userMessage } from 'src/interface/user.interface';
import {UserDTO} from '../dto/user.dto'


@Controller('/api/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('/login')
    async login(@Body() UserDTO:UserDTO):Promise<any>{
        const {login,password} = UserDTO
        const result = this.userService.login(login,password)
        return result
    }

    @Post('/register')
    async register(@Body() UserDTO:UserDTO):Promise<any>{
        let {login,password,repeatPass} = UserDTO
        
        const result = this.userService.register(login,password)
        return result
    }

    @Post('/mysubs')
    async mysub(@Req() param){
        let {id} = param.body
        let result = this.userService.mysubs(Number(id))
        return result
    }
    @Post("/mysubscribe")
    async mysubcribe(@Req() param){
        let {id} = param.body
        let result = this.userService.mysubcribe(Number(id))
        return result
    }
}
