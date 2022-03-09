import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  // Instantiate the logger
  private logger = new Logger('TasksRepository', { timestamp: true });

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    // Destructing the filter dto to obtain the status and the search term
    const { status, search } = filterDto;

    // Define a new query builder
    const query = this.createQueryBuilder('task');

    // Query for tasks owned by the user
    query.where({ user });

    // If status is passed filter by that
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    // If search is passed find where title or description is LIKE the search term
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      // Get the tasks
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${
          user.username
        }. Filters: ${JSON.stringify(filterDto)}.`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
  /**
   * Single responsibility for creating a task
   *
   * @param createTaskDto CreateTaskDto
   *
   * @returns
   */
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    // Destructuring for the DTO to obtain the properties we require
    const { title, description } = createTaskDto;

    // Create the task through the repository
    const task = this.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
      user,
    });

    // Handle the db operation of saving the task to the db
    await this.save(task);

    // Return the task
    return task;
  }
}
