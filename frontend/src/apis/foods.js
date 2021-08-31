import axios from "axios";
import { foodsIndex } from "../urls/index";

export const fetchFoods = async (restaurantId) => {
  const res = await axios.get(foodsIndex(restaurantId));
  return res.data;
}
