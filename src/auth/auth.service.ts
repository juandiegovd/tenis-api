import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import  *  as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async logIn(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {sub: user.id, username: user.email, role: user.role};
        return { 
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}
