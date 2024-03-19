import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { QUERY_PAGE_SIZE } from '@src/common/constants/query-page-size';
import { PageQueryDto } from '@src/common/dto/page-query.dto';
import { PaginationResponseDto } from '@src/interceptors/response-transformer-interceptor/dto/pagination-response.dto';

interface Res {
  data: unknown;
  key: string;
}

@Injectable()
export class ResponseBuilder {
  pagination(res: Res, pageQueryDto: PageQueryDto) {
    const { data, key } = res;

    if (!Array.isArray(data)) {
      throw new InternalServerErrorException('server error.');
    }

    const [array, totalCount] = data;

    if (!Array.isArray(array)) {
      throw new InternalServerErrorException('server error.');
    }

    if (typeof totalCount !== 'number') {
      throw new InternalServerErrorException('server error.');
    }

    if (!Number.isInteger(totalCount)) {
      throw new InternalServerErrorException('server error.');
    }

    const currentPage = Number(pageQueryDto.page) || 1;
    const pageSize = Number(pageQueryDto.pageSize) || QUERY_PAGE_SIZE.DEFAULT;
    const nextPage =
      pageSize * currentPage < totalCount ? currentPage + 1 : null;
    const hasNext = pageSize * currentPage < totalCount;
    const lastPage = Math.ceil(totalCount / pageSize);

    return new PaginationResponseDto(
      { [key]: array },
      {
        totalCount,
        currentPage,
        pageSize,
        nextPage,
        hasNext,
        lastPage,
      },
    );
  }
}
