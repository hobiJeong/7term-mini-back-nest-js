import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, Min, ValidationOptions } from 'class-validator';

export const IsPositiveInt = (
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  return applyDecorators(
    Type(() => Number),
    IsInt(validationOptions),
    Min(1, validationOptions),
  );
};
