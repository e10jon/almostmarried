import {Entity, Index, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm'

import {User} from './user'

@Entity()
@Index(['room', 'createdAt'])
export class Chat {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  body: string

  @ManyToOne(type => User, user => user.chats)
  user: User

  @Column()
  room: string

  @CreateDateColumn()
  createdAt: Date
}
