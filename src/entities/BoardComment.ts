import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('board_comment')
export class BoardComment {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '게시글 댓글 고유 ID',
    unsigned: true,
  })
  id: number;

  @Column('int', {
    name: 'board_id',
    comment: '게시글 고유 ID',
    unsigned: true,
  })
  boardId: number;

  @Column('int', {
    name: 'user_id',
    comment: '댓글 작성 유저 고유 ID',
    unsigned: true,
  })
  userId: number;

  @Column('text', { name: 'content', comment: '댓글 본문' })
  content: string;

  @Column('timestamp', {
    name: 'created_at',
    comment: '생성 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    comment: '삭제 일자',
  })
  deletedAt: Date | null;
}
