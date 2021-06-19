import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SensorDevices1623382167113 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'SensorDevices',
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
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'userId',
                        type: 'number',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKUsers',
                        referencedTableName: 'Users',
                        referencedColumnNames: ['id'],
                        columnNames: ['userId'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('SensorDevices');
    }
}
