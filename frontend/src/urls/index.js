const DEFAULT_API_LOCAL_HOST = "http://localhost:3000/api/v1";

export const restaurantsIndex = `${DEFAULT_API_LOCAL_HOST}/restaurants`;
export const foodsIndex = (restaurantsId) =>
  `${DEFAULT_API_LOCAL_HOST}/restaurants/${restaurantsId}/foods`;
export const lineFoods = `${DEFAULT_API_LOCAL_HOST}/line_foods`;
export const lineFoodsReplace = `${DEFAULT_API_LOCAL_HOST}/line_foods/replace`;
export const orders = `${DEFAULT_API_LOCAL_HOST}/orders`;
