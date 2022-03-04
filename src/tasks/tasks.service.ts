import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

// Makes this a singleton that can be injected into any controller
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  /**
   * Gets tasks
   *
   * @param filterDto GetTasksFilterDto
   *
   * @returns Task[]
   */
  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  /**
   * Creates a Task
   *
   * @param title string
   * @param description string
   *
   * @returns Task
   */
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  /**
   * Gets a Task by the ID
   *
   * @param id string
   *
   * @returns Task
   */
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  /**
   * Updates a tasks status
   *
   * @param id string
   * @param status TaskStatus
   *
   * @returns Task
   */
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    // Obtain the task
    const task = await this.getTaskById(id);

    // Assign the new status
    task.status = status;

    // Call the save method through the repository to update the task
    await this.tasksRepository.save(task);

    return task;
  }

  /**
   * Deletes a task from the array
   *
   * @param id string
   *
   * @returns Task
   */
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
