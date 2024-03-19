import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from './Board';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({
    type: 'tinyint',
    name: 'id',
    comment: '카테고리 고유 ID',
    unsigned: true,
  })
  id: number;

  @Column('varchar', { name: 'name', comment: '카테고리 이름', length: 20 })
  name: string;

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

  @OneToMany(() => Board, (board) => board.category)
  boards: Board[];
}
