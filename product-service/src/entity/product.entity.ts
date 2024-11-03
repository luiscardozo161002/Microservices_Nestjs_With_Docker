import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 }) 
  name: string;

  @Column({ type: 'text', nullable: true }) 
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) 
  price: number;

  @Column({ type: 'int', default: 0 }) 
  stock: number;

  @Column({ default: true })
  isActive: boolean;
}
