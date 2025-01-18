import { PaginationRequestDto } from '../docs/dto/pagination.dto';

export function generateFilter(
  query: PaginationRequestDto,
  searchOption?: any,
): { pageFilter: object; searchFilter: object } {
  return {
    pageFilter: {
      limit: query.pageSize || 10,
      offset: query.pageSize * (query.page - 1) || 0,
      order: query.orderBy
        ? [[query.orderBy, query.orderDirection ? query.orderDirection : 'ASC']]
        : [['updatedAt', 'DESC']],
    },
    searchFilter: query.search && searchOption,
  };
}
