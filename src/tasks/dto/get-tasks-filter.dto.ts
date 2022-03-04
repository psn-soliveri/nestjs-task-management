import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.status.enum';

export class GetTasksFilterDto {
  // Validate that the task status is optional and of a valid status
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  // Validate that the search term is optional and not empty
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
