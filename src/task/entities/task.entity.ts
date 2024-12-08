import { AbstractEntity } from 'src/database/abstract.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Task extends AbstractEntity<Task> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: Status;

  @Column()
  priority: Priority;

  @Column()
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Employee, (employee) => employee.tasks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column({ nullable: true })
  employeeId: string | null;
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export enum Status {
  TODO = 'Todo',
  IN_PROGRESS = 'In_progress',
  DONE = 'Done',
}
