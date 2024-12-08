import { AbstractEntity } from 'src/database/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Task } from 'src/task/entities/task.entity';

@Entity()
export class Employee extends AbstractEntity<Employee> {
  @Column()
  name: string;

  @OneToOne(() => ContactInfo, (contact) => contact.employee, {
    eager: true,
    cascade: true,
  })
  contactInfo: ContactInfo;

  @Column()
  position: string;

  @Column()
  department: string;

  @ManyToOne(() => Employee, (employee) => employee.subordinates, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'managerId' })
  manager: Employee;

  @Column({ nullable: true })
  managerId: string;

  @OneToMany(() => Employee, (employee) => employee.manager)
  subordinates: Employee[];

  @OneToMany(() => Task, (task) => task.employee, { cascade: true })
  tasks: Task[];
}
