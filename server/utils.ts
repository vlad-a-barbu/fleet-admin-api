export function paginatedQuery<T>(
  source: T[],
  pageNumber: number,
  pageSize: number
): { data: T[]; total: number } {
  const from = (pageNumber - 1) * pageSize;
  const data = source.slice(from, from + pageSize);
  return {
    data,
    total: source.length,
  };
}
