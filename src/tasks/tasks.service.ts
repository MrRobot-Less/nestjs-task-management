import { Injectable } from '@nestjs/common';
import { TaskEntity, TaskStatus } from './tasks.modal';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: TaskEntity[] = [];

  getAllTasks(): TaskEntity[] {
    return this.tasks;
  }

  getTaskById(id: string): TaskEntity | null {
    return this.tasks.find((task) => task.id === id) || null;
  }

  createTask(createTaskDto: CreateTaskDto): TaskEntity {
    const { title, description } = createTaskDto;
    const task: TaskEntity = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): TaskEntity | null {
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
      return task;
    }
    return null;
  }
}
