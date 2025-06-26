import { User } from "src/models/users.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Audited } from "./audited.entity";

@Entity()
export class Tournament extends Audited {
    @PrimaryGeneratedColumn()
    id: number; 
    name: string;
    description: string;
    @Column({ type: 'date' })
    startDate: Date;
    @Column({ type: 'date' })
    endDate: Date;
    location: string;
    website: string;
    players: User[];
    @Column({ default: true })
    isActive: boolean;
}