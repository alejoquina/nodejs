import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Role } from '../role/role.entity';
import { UserDetails } from './user.details.entity';

//tabla
@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', unique: true, length: 25, nullable: false})
    username: string;

    @Column({type: 'varchar', nullable:false})
    email: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;

    @OneToOne(()=> UserDetails, 
        {cascade:true, 
        nullable:false,
        eager:true })
    @JoinColumn({name: "details_id"})
    details: UserDetails;

    @ManyToMany(type=> Role, role => role.users)
    @JoinTable({name: "user_roles"})
    roles: Role[];


    @Column({type: 'timestamp', name: 'created_at'})
    createAT: Date;

    @Column({type: 'timestamp', name: 'update_at'})
    updateAT: Date;

    
}