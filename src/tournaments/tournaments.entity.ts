import { User } from "src/users/users.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tournament {
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
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    @Column({ default: true })
    isActive: boolean;
}