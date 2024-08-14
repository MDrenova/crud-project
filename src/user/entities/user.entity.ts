import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, Unique, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
@Unique(['email', 'username'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    birthday: Date;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6);
    }

    @Column()
    adress: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @OneToOne(()=> Employee, (employee)=> employee.user)
    employee: Employee

}
