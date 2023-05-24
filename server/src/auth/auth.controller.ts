import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, UserDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: UserDto) {
    try {
      return this.authService.signup(dto)
    } catch (error) {
      return error
    }
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    try {
      return this.authService.login(dto)
    } catch (error) {
      return error
    }
  }
}
