import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) {};

    async generateToken (expiration: string): Promise<string>{
        return await this.jwtService.signAsync({expiresIn: expiration})
    }
}