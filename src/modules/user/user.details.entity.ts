import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

//tabla
@Entity('users_details')
export class UserDetails extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;

    @Column({type: 'varchar', nullable:true})
    lastname: string;


    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createAT: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'update_at'})
    updateAT: Date;
}