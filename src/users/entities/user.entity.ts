import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'nsk_users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ type: 'simple-array' })
  roles: string[];
}