import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('MeasurementUnits')
class MeasurementUnit {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    symbol: string;

    @Column()
    description: string;
}

export { MeasurementUnit };
