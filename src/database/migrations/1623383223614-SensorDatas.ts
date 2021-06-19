import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SensorDatas1623383223614 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'SensorDatas',
                columns: [
                    {
                        name: 'id',
                        type: 'number',
                        isPrimary: true,
                    },
                    {
                        name: 'timestamp',
                        type: 'timestamp',
                    },
                    {
                        name: 'value',
                        type: 'number',
                    },
                    {
                        name: 'unitId',
                        type: 'number',
                    },
                    {
                        name: 'dataStreamId',
                        type: 'number',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'DataStreams',
                        referencedTableName: 'DataStreams',
                        referencedColumnNames: ['id'],
                        columnNames: ['dataStreamId'],
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
        await queryRunner.dropTable('SensorDatas');
    }
}
