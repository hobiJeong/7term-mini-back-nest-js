import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './Board';
import { User } from './User';

@Index('FK_board_love_board_id', ['boardId'], {})
@Index('FK_board_love_user_id', ['userId'], {})
@Entity('board_love')
export class BoardLove {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '게시글 좋아요 고유 ID',
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
    comment: '게시글 작성 유저 고유 ID',
    unsigned: true,
  })
  userId: number;

  @Column('timestamp', {
    name: 'created_at',
    comment: '생성 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Board, (board) => board.boardLoves, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'board_id', referencedColumnName: 'id' }])
  board: Board;

  @ManyToOne(() => User, (user) => user.boardLoves, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
