import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DataStreams1623382840634 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'DataStreams',
                columns: [
                    {
                        name: 'id',
                        type: 'number',
                        isPrimary: true,
                    },
                    {
                        name: 'key',
                        type: 'varchar',
                    },
                    {
                        name: 'label',
                        type: 'varchar',
                    },
                    {
                        name: 'enable',
                        type: 'boolean',
                    },
                    {
                        name: 'deviceId',
                        type: 'number',
                    },
                    {
                        name: 'unitId',
                        type: 'number',
                    },
                    {
                        name: 'measurementCount',
                        type: 'number',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKSensorDevice',
                        referencedTableName: 'SensorDevices',
                        referencedColumnNames: ['id'],
                        columnNames: ['deviceId'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKMeasurementUnit',
                        referencedTableName: 'MeasurementUnits',
                        referencedColumnNames: ['id'],
                        columnNames: ['unitId'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('DataStreams');
    }
}
