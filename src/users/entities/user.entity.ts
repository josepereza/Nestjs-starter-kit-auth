import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({})
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;
    @Column()
    name: string;
    @Column({unique: true})
    username: string;
    @Column({unique: true})
    email: string;
    @Column()
    password: string;
  }