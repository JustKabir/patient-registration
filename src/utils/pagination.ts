export const calculatePagination = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): {
  paginatedItems: T[];
  totalPages: number;
} => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);
  return {
    paginatedItems,
    totalPages,
  };
};
