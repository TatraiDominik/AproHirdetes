import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.model"; 

@Entity()
export class Advertisement {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => User, user => user.id)  
    user: User;

    @Column()
    date: Date;

    @Column()
    category: string;

    @Column()
    title: string;

    @Column({type: 'text'})
    description: string;

    @Column()
    price: number;

    @Column()
    image: string;
}
