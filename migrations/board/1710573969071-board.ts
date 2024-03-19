import {
  generatePrimaryColumn,
  generateUserIdColumn,
  generateCategoryIdColumn,
  generateCreatedAtColumn,
  generateUpdatedAtColumn,
  generateDeletedAtColumn,
} from 'migrations/__utils/util';
import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class Board1710573969071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'board',
        columns: [
          generatePrimaryColumn('게시글 고유 ID'),
          generateUserIdColumn('게시글 작성 유저 고유 ID'),
          generateCategoryIdColumn(),
          new TableColumn({
            name: 'content',
            type: 'text',
            isNullable: false,
            comment: '게시글 본문',
          }),
          generateCreatedAtColumn(),
          generateUpdatedAtColumn(),
          generateDeletedAtColumn(),
        ],
        foreignKeys: [
          {
            name: 'FK_board_user_id',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_board_category_id',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.query('ALTER TABLE board COMMENT = "게시판"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('board');
  }
}
