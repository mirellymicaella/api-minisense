import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SensorDevice } from './SensorDevice';

@Entity('Users')
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @OneToMany(() => SensorDevice, (device) => device.user)
    devices: SensorDevice[];
}

export { User };
