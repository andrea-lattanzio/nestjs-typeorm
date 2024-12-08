import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class ContactInfo extends AbstractEntity<ContactInfo> {
  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => Employee, employee => employee.contactInfo, { onDelete: 'CASCADE'})
  @JoinColumn()
  employee: Employee;
}