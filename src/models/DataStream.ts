import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MeasurementUnit } from './MeasurementUnit';
import { SensorData } from './SensorData';
import { SensorDevice } from './SensorDevice';

@Entity('DataStreams')
class DataStream {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ unique: true })
    key: string;

    @Column()
    label: string;

    @Column({ default: false })
    enabled: boolean;

    @Column()
    unitId: number;

    @Column()
    deviceId: number;

    @Column({ default: 0 })
    measurementCount: number;

    @ManyToOne(() => MeasurementUnit)
    @JoinColumn({ name: 'unitId' })
    measurementUnit: MeasurementUnit;

    @ManyToOne(() => SensorDevice, (device) => device.streams,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'deviceId' })
    device: SensorDevice;

    @OneToMany(() => SensorData, (data) => data.dataStream,{ onDelete: 'SET NULL' })
    measurements: SensorData[];

    @AfterLoad()
    updateCounter() {
      if (this.measurements) this.measurementCount = this.measurements.length;
    }
}

export { DataStream };
