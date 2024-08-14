import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Example {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;
}