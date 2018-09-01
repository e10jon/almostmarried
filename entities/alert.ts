import {Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm'

import {ResponseTypes} from '../typings/response-types'
import {Response} from './response'
import {User} from './user'

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  body: string

  @Column('enum', {enum: ResponseTypes})
  responseType: string

  @ManyToOne(type => User, user => user.alerts)
  user: User

  @OneToMany(type => Response, response => response.alert)
  responses: Response[]

  @CreateDateColumn()
  createdAt: Date
}
