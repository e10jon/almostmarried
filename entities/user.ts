import {Entity, Index, OneToMany, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm'

import {Chat} from './chat'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index({unique: true})
  email: string

  @Column()
  handle: string

  @Column({type: 'smallint', unsigned: true})
  verificationCode: number

  @OneToMany(type => Chat, chat => chat.user)
  chats: Chat[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  toJSON = () => ({
    id: this.id,
    handle: this.handle,
  })
}
