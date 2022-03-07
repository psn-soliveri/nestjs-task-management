import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.status.enum';

@Entity()
export class Task {
  // Generate the id column to be the primary key
  // instead of sequential ids 1,2,3... pass in the string 'uuid' for unique generated string ids
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Other columns in the table
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
