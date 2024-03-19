import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Index('FK_token_user_id', ['userId'], {})
@Entity('token')
export class Token {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '토큰 고유 ID',
    unsigned: true,
  })
  id: number;

  @Column('int', { name: 'user_id', comment: '유저 고유 ID', unsigned: true })
  userId: number;

  @Column('varchar', {
    name: 'access_token',
    comment: '유저 액세스 토큰',
    length: 255,
  })
  accessToken: string;

  @Column('varchar', {
    name: 'refresh_token',
    comment: '유저 리프레쉬 토큰',
    length: 255,
  })
  refreshToken: string;

  @Column('timestamp', {
    name: 'created_at',
    comment: '생성 일자',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.tokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
