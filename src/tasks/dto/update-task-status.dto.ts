import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.status.enum';

export class UpdateTaskStatusDto {
  // Validate that the passed status is in defined set of values
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
