import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Blog from './blog.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  gender: string;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
