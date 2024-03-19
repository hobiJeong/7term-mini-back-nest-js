import { Injectable } from '@nestjs/common';
import { SortOrder } from '@src/common/constants/sort-order.enum';
import { OrderFieldForQueryBuilderHelper } from '@src/helpers/constants/order-field-for-helper.type';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class QueryBuilderHelper {
  buildWherePropForFind<E extends Record<string, any>>(
    queryBuilder: SelectQueryBuilder<E>,
    filter: Partial<Record<keyof E, E[keyof E]>>,
    alias: string,
    likeSearchFields?: readonly (keyof E)[],
  ) {
    for (const key in filter) {
      const parameterName = key;

      if (likeSearchFields?.includes(key) && filter[key]) {
        queryBuilder
          .andWhere(`${alias}.${key} LIKE :` + parameterName)
          .setParameter(parameterName, `%${filter[key]}%`);
      } else if (typeof filter[key] === 'boolean') {
        queryBuilder
          .andWhere(`${alias}.${key} = :` + parameterName)
          .setParameter(parameterName, filter[key]);
      } else if (filter[key]) {
        queryBuilder
          .andWhere(`${alias}.${key} = :` + parameterName)
          .setParameter(parameterName, filter[key]);
      }
    }
  }

  buildOrderByPropForFind<E extends Record<string, any>>(
    queryBuilder: SelectQueryBuilder<E>,
    alias: string,
    orderField: OrderFieldForQueryBuilderHelper,
    sortOrder: SortOrder,
  ) {
    queryBuilder.orderBy(`${alias}.${orderField}`, sortOrder);
  }
}
