import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, UserDto } from './dto'
import { JwtGuard } from './guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtGuard)
  @Post('signup')
  signup(@Body() dto: UserDto) {
    try {
      return this.authService.signup(dto)
    } catch (error) {
      return error
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: LoginDto) {
    try {
      return this.authService.signin(dto)
    } catch (error) {
      return error
    }
  }
}
