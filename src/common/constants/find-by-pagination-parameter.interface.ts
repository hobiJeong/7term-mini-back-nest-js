export interface FindByPaginationParameter<T extends Record<string, any>> {
  where: Record<keyof T, any>;
  order: Record<string, any>;
  skip: number;
  take: number;
}
