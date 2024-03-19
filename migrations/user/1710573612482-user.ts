import {
  generateCreatedAtColumn,
  generateDeletedAtColumn,
  generatePrimaryColumn,
  generateUpdatedAtColumn,
} from 'migrations/__utils/util';
import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class User1710573612482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          generatePrimaryColumn('유저 고유 ID'),
          new TableColumn({
            name: 'nickname',
            type: 'varchar',
            length: '20',
            isNullable: false,
            comment: '유저 고유 닉네임',
          }),
          new TableColumn({
            name: 'login_id',
            type: 'varchar',
            length: '20',
            isNullable: false,
            comment: '유저 고유 로그인 id',
          }),
          new TableColumn({
            name: 'password',
            type: 'varchar',
            length: '20',
            isNullable: false,
            comment: '유저 로그인 패스워드',
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: '유저 고유 이메일',
          }),
          generateCreatedAtColumn(),
          generateUpdatedAtColumn(),
          generateDeletedAtColumn(),
        ],
        uniques: [
          {
            columnNames: ['login_id'],
            name: 'UQ_user_login_id',
          },
          {
            columnNames: ['nickname'],
            name: 'UQ_user_nickname',
          },
          {
            columnNames: ['email'],
            name: 'UQ_user_email',
          },
        ],
      }),
    );

    await queryRunner.query('ALTER TABLE user COMMENT = "유저"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
