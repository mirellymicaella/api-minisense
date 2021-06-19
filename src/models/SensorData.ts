import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { DataStream } from './DataStream';
import { MeasurementUnit } from './MeasurementUnit';

@Entity('SensorDatas')
class SensorData {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    timestamp: Date;

    @Column()
    value: number;

    @Column()
    dataStreamId: number;

    @Column()
    unitId: number;

    @ManyToOne(() => DataStream, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'dataStreamId' })
    dataStream: DataStream;

    @ManyToOne(() => MeasurementUnit,{ onDelete: 'SET NULL' })
    @JoinColumn({ name: 'unitId' })
    measurementUnit: MeasurementUnit;
}

export { SensorData };
