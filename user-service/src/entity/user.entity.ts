import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 50, unique: true})
  username: string;

  @Column({unique: true})
  email: string;

  @Column() //@Column({ select: false}) para ocultar la contraseña
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
