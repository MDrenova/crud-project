import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

export enum CivilStatus {
    Single = 'Single',
    Married = 'Married',
    Divorced = 'Divorced',
    Widowed = 'Widowed',
}

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    experience: string;

    @Column()
    departament: string;

    @Column()
    dateStartingJob: Date;

    @Column({
        type: 'enum',
        enum: CivilStatus,
    })
    civilStatus: CivilStatus;

    @OneToOne(() => User, { onDelete: 'CASCADE', cascade: true })
    @JoinColumn()
    user: User;
}
