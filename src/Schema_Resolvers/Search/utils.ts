export const _cleanSearchQuery = (searchQueryInput: any) => {
  const cleanQuery: any = {};

  for (let key in searchQueryInput) {
    cleanQuery[key] = { $in: searchQueryInput[key] };
  }

  return cleanQuery;
};
