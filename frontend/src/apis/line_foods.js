import axios from "axios";
import { lineFoods, lineFoodsReplace } from "../urls/index";

export const postLineFoods = async (params) => {
  const res = await axios.post(lineFoods,
    {
      food_id: params.foodId,
      count: params.count,
    }
  );
  return res;
};

export const replaceLineFoods = async (params) => {
  const res = await axios.put(lineFoodsReplace,
    {
      food_id: params.foodId,
      count: params.count,
    }
  );
  return res;
};


