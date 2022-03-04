import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
