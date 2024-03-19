import { BoardCommentOrderField } from '@src/apis/board-comments/constants/board-comment-order-field.enum';
import { BoardOrderField } from '@src/apis/boards/constants/board-order-field.enum';

export type OrderFieldForQueryBuilderHelper =
  | BoardOrderField
  | BoardCommentOrderField;
