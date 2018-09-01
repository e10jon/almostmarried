import {Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm'

import {Alert} from './alert'
import {User} from './user'

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  body: string

  @ManyToOne(type => User, user => user.responses, {nullable: true})
  user: User

  @ManyToOne(type => Alert, alert => alert.responses)
  alert: Alert

  @CreateDateColumn()
  createdAt: Date
}
