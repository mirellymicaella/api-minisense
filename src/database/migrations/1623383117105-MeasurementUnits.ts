import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MeasurementUnits1623383117105 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'MeasurementUnits',
                columns: [
                    {
                        name: 'id',
                        type: 'number',
                        isPrimary: true,
                    },
                    {
                        name: 'symbol',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('MeasurementUnits');
    }
}
