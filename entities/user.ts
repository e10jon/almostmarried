import {Entity, Index, OneToMany, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm'

import {Alert} from './alert'
import {Chat} from './chat'
import {Response} from './response'

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

  @OneToMany(type => Alert, alert => alert.user)
  alerts: Alert[]

  @OneToMany(type => Response, response => response.user)
  responses: Response[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  isAdmin = () => process.env.ADMIN_EMAILS.split(',').includes(this.email)

  toJSON = () => ({
    id: this.id,
    handle: this.handle,
  })
}
