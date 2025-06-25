import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../role/roles";

@Entity()
export class User {
    @PrimaryGeneratedColumn ()
    id: number;
    @Column({ unique: true })
    documentNumber: string;
    @Column()
    name: string;
    @Column({ unique: true })
    email: string;
    @Column({ select: false })
    password: string;
    @Column()
    address: string;
    @Column()
    phone: string;
    @Column({ type: 'date' })
    birthDate?: Date;
    @Column({type: 'enum', enum: Role, default: Role.USER})
    role: Role;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    @Column({ default: true })
    isActive: boolean;
}