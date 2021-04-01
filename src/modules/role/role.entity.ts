import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { UserModule } from "../user/user.module";

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

    @Column({type: 'timestamp', name: 'created_at'})
    createAT: Date;

    @Column({type: 'timestamp', name: 'update_at'})
    updateAT: Date;
    
}