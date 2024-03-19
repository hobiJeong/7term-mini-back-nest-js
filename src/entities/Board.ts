import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';
import { BoardLove } from './BoardLove';

@Index('FK_board_user_id', ['userId'], {})
@Index('FK_board_category_id', ['categoryId'], {})
@Entity('board')
export class Board {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '게시글 고유 ID',
    unsigned: true,
  })
  id: number;

  @Column('int', {
    name: 'user_id',
    comment: '게시글 작성 유저 고유 ID',
    unsigned: true,
  })
  userId: number;

  @Column('tinyint', {
    name: 'category_id',
    comment: '카테고리 고유 ID',
    unsigned: true,
  })
  categoryId: number;

  @Column('text', { name: 'content', comment: '게시글 본문' })
  content: string;

  @Column('timestamp', {
    name: 'created_at',
    comment: '생성 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'updated_at',
    comment: '수정 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: '삭제 일자',
  })
  deletedAt: Date | null;

  @ManyToOne(() => Category, (category) => category.boards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;

  @ManyToOne(() => User, (user) => user.boards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => BoardLove, (boardLove) => boardLove.board)
  boardLoves: BoardLove[];
}
