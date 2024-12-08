import { AbstractEntity } from 'src/database/abstract.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Timestamp,
} from 'typeorm';

@Entity()
export class Meeting extends AbstractEntity<Meeting> {
  @Column()
  title: string;
  @Column()
  description: string;

  @Column()
  date: Date;

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp', { nullable: true })
  endTime: Date | null;

  @Column({ nullable: true })
  duration: string;

  @BeforeInsert()
  @BeforeUpdate()
  calculateDuration() {
    if (!this.startTime || !this.endTime) {
      this.duration = 'Not available';
      return;
    }

    const start = new Date(this.startTime);
    const end = new Date(this.endTime);

    const diffInMs = end.getTime() - start.getTime();
    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    this.duration = `${hours}h ${remainingMinutes}m`;
  }

  @ManyToOne(() => Employee, (employee) => employee.ownedMeetings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: Employee;

  @Column({ nullable: true })
  ownerId: string | null;

  @ManyToMany(() => Employee, (employee) => employee.acceptedMeetings)
  attendees: Employee[];
}
