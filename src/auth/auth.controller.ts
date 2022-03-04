import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Decorator for Post method
  @Post('/signup')
  /**
   * Sign up to the app
   *
   * @param authCredentialsDto AuthCredentialsDto
   *
   * @return void
   */
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
