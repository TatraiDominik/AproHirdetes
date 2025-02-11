import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export enum Role{
    user = 'user',
    admin = "admin"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string
    
    @Column()
    name: string

    @Column()
    address: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({
        type:'enum',
        enum:Role,
        default: Role.user
    })
    role: Role
}