import {Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm'

import {Response} from './response'
import {User} from './user'

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  body: string

  @ManyToOne(type => User, user => user.alerts)
  user: User

  @OneToMany(type => Response, response => response.alert)
  responses: Response[]

  @CreateDateColumn()
  createdAt: Date
}
