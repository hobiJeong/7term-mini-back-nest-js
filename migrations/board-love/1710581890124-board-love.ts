import {
  generateCreatedAtColumn,
  generatePrimaryColumn,
  generateUserIdColumn,
} from 'migrations/__utils/util';
import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class BoardLove1710581890124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'board_love',
        columns: [
          generatePrimaryColumn('게시글 좋아요 고유 ID'),
          new TableColumn({
            name: 'board_id',
            type: 'int',
            unsigned: true,
            isNullable: false,
            comment: '게시글 고유 ID',
          }),
          generateUserIdColumn('게시글 작성 유저 고유 ID'),
          generateCreatedAtColumn(),
        ],
        foreignKeys: [
          {
            name: 'FK_board_love_board_id',
            columnNames: ['board_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'board',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_board_love_user_id',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.query('ALTER TABLE board_love COMMENT = "게시글 좋아요"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('board_love');
  }
}
