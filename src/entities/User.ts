import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './Board';
import { BoardLove } from './BoardLove';
import { Token } from './Token';

@Index('UQ_user_login_id', ['loginId'], { unique: true })
@Index('UQ_user_nickname', ['nickname'], { unique: true })
@Index('UQ_user_email', ['email'], { unique: true })
@Entity('user')
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '유저 고유 ID',
    unsigned: true,
  })
  id: number;

  @Column('varchar', {
    name: 'nickname',
    unique: true,
    comment: '유저 고유 닉네임',
    length: 20,
  })
  nickname: string;

  @Column('varchar', {
    name: 'login_id',
    unique: true,
    comment: '유저 고유 로그인 id',
    length: 20,
  })
  loginId: string;

  @Column('varchar', {
    name: 'password',
    comment: '유저 로그인 패스워드',
    length: 20,
  })
  password: string;

  @Column('varchar', {
    name: 'email',
    unique: true,
    comment: '유저 고유 이메일',
    length: 50,
  })
  email: string;

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

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => BoardLove, (boardLove) => boardLove.user)
  boardLoves: BoardLove[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
