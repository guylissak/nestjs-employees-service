import { Entity, Column, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryColumn()
  email: string;

  @Column()
  @Generated('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  department: string;

  @Column()
  salary: number;

  @Column()
  role: string;
}
