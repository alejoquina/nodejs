import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../user/user.entity";


@Entity('roles')
export class Role extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type: "varchar", length: 20, nullable:false })
    name_role: string;

    @Column({ type: "text", nullable:false })
    descripcion: string;
    
    @ManyToMany(type=> User, user => user.roles)
    @JoinColumn()
    users: User[];
    
    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createAT: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'update_at'})
    updateAT: Date;
    
}