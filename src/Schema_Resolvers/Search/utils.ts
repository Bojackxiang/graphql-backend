import { STATE_IN_SHORT } from "../../Constants/general";

export const _cleanSearchQuery = (searchQueryInput: any) => {
  const cleanQuery: any = {};

  for (let key in searchQueryInput) {
    switch (key) {
      case STATE_IN_SHORT:
        cleanQuery[key] = searchQueryInput[key];
        break;
      default:
        cleanQuery[key] = { $in: searchQueryInput[key] };
    }
  }

  return cleanQuery;
};
