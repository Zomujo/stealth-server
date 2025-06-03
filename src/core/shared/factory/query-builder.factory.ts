import { IncludeOptions, Op } from 'sequelize';
import { QueryOptionsDto } from '../dto/query-options.dto';

export function buildQuery<T>(
  params: QueryOptionsDto<T>,
  populates: Record<string, IncludeOptions>,
): Record<string, any> {
  let searchQuery: Record<string, any>[] = [];

  if (params.search && params.searchFields.length > 0) {
    searchQuery = params.searchFields.map((field) => ({
      [field]: { [Op.iLike]: `%${params.search}%` },
    }));
  }

  let queryOptions: Record<string, any> = {
    where: {
      ...(searchQuery.length > 0 && {
        [Op.or]: searchQuery,
      }),
    },
  };

  if (params.query) {
    queryOptions = {
      where: {
        [Op.and]: params.query,
      },
    };
  }

  if (params.fields) {
    queryOptions.attributes = params.fields;
  }

  if (params.populate) {
    queryOptions.include = params.populate.map(
      (item) => populates[item as string],
    );
  }

  if (params.sort) {
    queryOptions.order = [
      [
        params.sort.replace(/^-/, ''),
        params.sort.startsWith('-') ? 'DESC' : 'ASC',
      ],
    ];
  }

  queryOptions.limit = params.pageSize || 10;
  queryOptions.offset = queryOptions.limit * (params.page - 1) || 0;

  return queryOptions;
}
