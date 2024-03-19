import {
  generateCreatedAtColumn,
  generateDeletedAtColumn,
  generatePrimaryColumn,
  generateUserIdColumn,
} from 'migrations/__utils/util';
import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class BoardComment1710582578941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'board_comment',
        columns: [
          generatePrimaryColumn('게시글 댓글 고유 ID'),
          new TableColumn({
            name: 'board_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
            comment: '게시글 고유 ID',
          }),
          generateUserIdColumn('댓글 작성 유저 고유 ID'),
          new TableColumn({
            name: 'content',
            type: 'text',
            isNullable: false,
            comment: '댓글 본문',
          }),
          generateCreatedAtColumn(),
          generateDeletedAtColumn(),
        ],
      }),
    );

    await queryRunner.query('ALTER TABLE board_comment COMMENT = "댓글"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('board_comment');
  }
}
