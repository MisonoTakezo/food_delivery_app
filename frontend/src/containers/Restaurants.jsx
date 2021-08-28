import React, { Fragment, useEffect } from "react";

// api
import { fetchRestaurants } from "../apis/restaurants.js";

export const Restaurants = () => {
  useEffect(() => {
    fetchRestaurants()
      .then((data) => console.log(data))
  }, [])
  return (
    <Fragment>
      レストラン一覧
    </Fragment>
  );
}
