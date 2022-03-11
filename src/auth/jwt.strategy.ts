import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * Validate the JWT
   *
   * @param payload JwtPayload
   *
   * @returns User
   */
  async validate(payload: JwtPayload): Promise<User> {
    // Destruct the username to obtain the payload
    const { username } = payload;

    // Attempt to find the user
    const user = this.usersRepository.findOne({ username });

    // If the user is not found
    if (!user) {
      throw new UnauthorizedException();
    }

    // Return user
    return user;
  }
}
