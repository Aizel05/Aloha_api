import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;
}
