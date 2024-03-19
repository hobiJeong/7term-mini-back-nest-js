import {
  generateCreatedAtColumn,
  generateUpdatedAtColumn,
} from 'migrations/__utils/util';
import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class Category1710573964953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'tinyint',
            unsigned: true,
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
            comment: '카테고리 고유 ID',
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            length: '20',
            isNullable: false,
            comment: '카테고리 이름',
          }),
          generateCreatedAtColumn(),
          generateUpdatedAtColumn(),
        ],
      }),
    );

    await queryRunner.query('ALTER TABLE category COMMENT = "카테고리"');

    await queryRunner.manager.getRepository('category').upsert(
      [
        {
          name: '자유',
        },
        {
          name: '10대',
        },
        {
          name: '20대',
        },
        {
          name: '30대',
        },
      ],
      ['name'],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category');
  }
}
