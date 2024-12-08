import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TaskErrorMessages as ErrMsg } from './dto/task.error.messages';
import { TaskQueryDto } from './dto/task.query.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = new Task(createTaskDto);
    try {
      return await this.entityManager.save(newTask);
    } catch (error) {
     throw new NotFoundException(ErrMsg.EmployeeNotFound);
    }
  }

  async findAll(findTaskDto: TaskQueryDto) {
    const { title, description, priority, status, page, limit } = findTaskDto;
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if(title) {
      queryBuilder.andWhere('task.title LIKE :title', { title: `%${title}%` });
    }

    if(description) {
      queryBuilder.andWhere('task.description LIKE :description', { description: `%${description}%` });
    }

    if(priority) {
      queryBuilder.andWhere('task.priority = :priority', { priority: priority });
    }

    if(status) {
      queryBuilder.andWhere('task.status = :status', { status: status });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);
    const [tasks, total] = await queryBuilder.getManyAndCount();

    return {
      tasks,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id: id },
      relations: { employee: true },
    });
    if(!task) throw new NotFoundException(ErrMsg.TaskNotFound);
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this._findById(id);
      Object.entries(updateTaskDto).forEach(([key, newValue]) => {
        if (newValue != null) task[key] = newValue;
      });
      return await this.entityManager.save(task);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    const deleteResult = await this.taskRepository.delete(id);
    if (deleteResult.affected === 0) throw new NotFoundException();
    return { message: 'task removed' };
  }

  private async _findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: id }});
    if(!task) throw new NotFoundException(ErrMsg.TaskNotFound);
    return task;
  }
}
