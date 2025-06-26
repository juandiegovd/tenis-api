import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./roles";
import { Audited } from "./audited.entity";

@Entity()
export class User extends Audited {
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
    @Column({ default: true })
    isActive: boolean;
}