import { Controller, Get, HttpStatus, HttpException, Param, Delete, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('libros')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): Promise<Book []> {
    return this.booksService.findAll()
  }

  @Get(':id')
  getBook(@Param() params: any): any {
    let book = this.booksService.findOne(Number(params.id))
    if (book) return book
    else return new HttpException('message', HttpStatus.INTERNAL_SERVER_ERROR)
  }

  @Post(':nombre/:autor')
  addBook(@Param() params: any): any {
    this.booksService.add({
      nombre: params.nombre,
      autor: params.autor
    }
      ).then(() => {
      return 'Libro creado'
    }).catch(() => {
      return new HttpException('message', HttpStatus.INTERNAL_SERVER_ERROR)
    })
  }

  @Delete(':id')
  deleteBook(@Param() params: any): Promise<HttpStatus> {
    return this.booksService.remove(params.id).then(() => {
      return HttpStatus.ACCEPTED
    })
  }

  @Put(':idUsuario/:idLibro')
  modifyBook(@Param() params: any): any {
    if (this.booksService.rent(Number(params.idUsuario), Number(params.idLibro))) {
      return HttpStatus.OK
    }
  }
}
