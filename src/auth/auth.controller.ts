import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    logIn(@Body('email') email: string, @Body('password') password: string): Promise<any> {
        return this.authService.logIn(email, password);
    }

    @Post('logout')
    logOut(@Req() req): string {
        
        return 'Logged out successfully';
    }
}
