import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import upload from '../config/upload';

@Entity('books')
export default class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column()
  coverPicture: string;

  @Expose({ name: 'cover_url' })
  getAvatarUrl(): string | null {
    if (!this.coverPicture) {
      return null;
    }
   
    return `${process.env.APP_API_URL}/files/${this.coverPicture}`;
  }
}
