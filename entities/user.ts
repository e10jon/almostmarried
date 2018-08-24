import {Entity, Index, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm'

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  toAuth = () => ({
    id: this.id,
    handle: this.handle,
  })
}
