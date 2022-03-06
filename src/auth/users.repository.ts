import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    // Destruct the dto to obtain the information required
    const { username, password } = authCredentialsDto;

    // Generate a hashed password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a user
    const user = this.create({ username, password: hashedPassword });

    try {
      // Save the user
      await this.save(user);
    } catch (error) {
      // Duplicate username
      if (error.code === '23505') {
        throw new ConflictException(`username already exists`);
      }

      throw new InternalServerErrorException();
    }
  }
}
