import { Controller, Get, Post, Param, HttpException, HttpStatus, Delete, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from 'src/utils/auth.service';
import { AuthGuard } from 'src/utils/auth.guard';

@Controller('usuarios')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post('registrar')
  async createUser(@Body() nombre: string) : Promise<any> {
    this.usersService.add(nombre).then(() => {
      return 'Usuario creado'
    }).catch(() => {
      return new HttpException('message', HttpStatus.INTERNAL_SERVER_ERROR)
    })
    const token = await this.authService.generateToken('1h')
    return {token}
  } 

  @UseGuards(AuthGuard)
  @Get()
  getUsers(): Promise<User []> {
    return this.usersService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param() params: any): Promise<string> {
    let usuario = this.usersService.findOne(Number(params.id))
    return usuario.then(user => user.nombre)
  }

  @UseGuards(AuthGuard)
  @Post(':nombre')
  addUser(@Param() params: any): any {
    this.usersService.add(params.nombre).then(() => {
      return 'Usuario creado'
    }).catch(() => {
      return new HttpException('message', HttpStatus.INTERNAL_SERVER_ERROR)
    })
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param() params: any): Promise<HttpStatus> {
    return this.usersService.remove(params.id).then(() => {
      return HttpStatus.ACCEPTED
    })
  }
}
