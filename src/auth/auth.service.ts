import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * Sign up a user
   *
   * @param authCredentialsDto AuthCredentialsDto
   *
   * @returns void
   */
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  /**
   * Signs into the application
   *
   * @param authCredentialsDto AuthCredentialsDto
   *
   * @returns string
   */
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    // If the user does not exist or the passwords do not match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    // Create a JWT
    const payload: JwtPayload = { username };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
