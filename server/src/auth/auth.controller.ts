import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  login(@Body() dto: UserDto) {
    try {
      return this.authService.signup(dto)
    } catch (error) {
      return error
    }
  }
}
