export const dynamicSort = (property, order) => {
  let sortOrder = 1;
  if (order === 'desc') {
    sortOrder = -1;
  }
  return function (a, b) {
    if (a[property] < b[property]) {
      return -1 * sortOrder;
    }
    if (a[property] > b[property]) {
      return 1 * sortOrder;
    }
    return 0 * sortOrder;
  };
};
