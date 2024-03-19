import {
  generateCreatedAtColumn,
  generatePrimaryColumn,
  generateUserIdColumn,
} from 'migrations/__utils/util';
import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class Token1710583945249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'token',
        columns: [
          generatePrimaryColumn('토큰 고유 ID'),
          generateUserIdColumn(),
          new TableColumn({
            name: 'access_token',
            type: 'varchar',
            length: '255',
            isNullable: false,
            comment: '유저 액세스 토큰',
          }),
          new TableColumn({
            name: 'refresh_token',
            type: 'varchar',
            length: '255',
            isNullable: false,
            comment: '유저 리프레쉬 토큰',
          }),
          generateCreatedAtColumn(),
        ],
        foreignKeys: [
          {
            name: 'FK_token_user_id',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
        uniques: [
          {
            name: 'UQ_token_user_id',
            columnNames: ['user_id'],
          },
        ],
      }),
    );

    await queryRunner.query('ALTER TABLE token COMMENT = "토큰"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('token');
  }
}
