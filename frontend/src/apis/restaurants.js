import axios from "axios";
import { restaurantsIndex } from "../urls/index.js"

export const fetchRestaurants = () => {
  return axios.get(restaurantsIndex)
    .then(res => {
      return res.data;
    })
    .catch((e) => console.error(e));
}
