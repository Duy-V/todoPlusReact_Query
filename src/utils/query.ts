// utils.ts

export const constructQueryString = (params: any, source: string) => {
  let queryString = "";
  let isFirstParam = true;

  for (let key in params) {
    if (key === "page" && key === "limit") {
      queryString += isFirstParam ? "?" : "&";
      queryString += `_limit=${params.limit}&_page=${params.page}&_sort=id&_order=desc`;
    } else if (key === "searchText") {
      queryString += isFirstParam ? "?" : "&";
      if (source === "tagsList") {
        queryString += `_q=${params.searchText}`;
      } else {
        queryString += `_q=${params.searchText}`;
      }
    } else if (key === "sortOrder" && params.sortOrder !== undefined) {
      // Check if sortOrder is not undefined
      queryString += isFirstParam ? "?" : "&";
      queryString += `_sort=${params.sortOrder}`;
    }
    isFirstParam = false;
  }

  // If sortOrder is not specified, sort by id in descending order
  if (!params.sortOrder) {
    queryString += isFirstParam
      ? "?_sort=id&_order=desc"
      : "&_sort=id&_order=desc";
  }

  return queryString;
};
