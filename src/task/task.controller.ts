import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQueryDto } from './dto/task.query.dto';
import { UuidValidationPipe } from 'src/pipes/uuid.validation.pipe';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() findTaskDto: TaskQueryDto) {
    return this.taskService.findAll(findTaskDto);
  }

  @Get(':id')
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', UuidValidationPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', UuidValidationPipe) id: string) {
    return this.taskService.remove(id);
  }
}
