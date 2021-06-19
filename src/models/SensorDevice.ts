import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { DataStream } from './DataStream';
import { User } from './User';

@Entity('SensorDevices')
class SensorDevice {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    key: string;

    @Column()
    label: string;

    @Column()
    description: string;

    @ManyToOne(() => User,user => user.devices,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @OneToMany(() => DataStream, (stream) => stream.device)
    streams: DataStream[];
}

export { SensorDevice };
