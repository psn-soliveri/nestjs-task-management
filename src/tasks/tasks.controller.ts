import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

// Controller docorator maps the controller to the endpoint `/tasks`
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // Decorator for GET
  @Get()
  /**
   * Gets all of the tasks
   *
   * @returns Task[]
   */
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  // Decorator for POST
  @Post()
  /**
   * Creates a Task
   *
   * @param title string
   * @param description string
   *
   * @returns Task
   */
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  // Decorator but passing in a path parameter
  @Get('/:id')
  /**
   * Gets a task by id
   *
   * @param id string
   *
   * @returns Task
   */
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  // Decorator but passing in a path parameter
  @Patch('/:id/status')
  /**
   * Updates a tasks status
   *
   * @param id string
   * @param status TaskStatus
   *
   * @returns Task
   */
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    // Destruct DTO to obtain the status
    const { status } = updateTaskStatusDto;

    return this.taskService.updateTaskStatus(id, status);
  }

  // Decorator but passing in a path parameter
  @Delete('/:id')
  /**
   * Deletes a task by the id
   *
   * @param id string
   *
   * @returns Task
   */
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
