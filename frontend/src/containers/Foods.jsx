import React, { Fragment, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

import { COLORS } from "../style_constants";

//components
import { LocalMallIcon } from "../components/icons";
import { FoodWrapper } from "../components/FoodWrapper";
import Skelton from "@material-ui/lab/Skeleton";
import { FoodOrderDialog } from "../components/FoodOrderDialog";
import { NewOrderConfirmDialog } from "../components/NewOrderConfirmDialog";

// reducers
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from "../reducers/foods";

// api
import { fetchFoods } from "../apis/foods";
import { postLineFoods, replaceLineFoods } from "../apis/line_foods";

// images
import MainLogo from "../images/logo.png";
import FoodImage from "../images/food-image.jpg";

// constants
import { HTTP_STATUS_CODE, REQUEST_STATE } from "../constants";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

export const Foods = ({ match }) => {

  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const history = useHistory();

  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
    isOpenNewOrderDialog: false,
    existingRestaurantName: "",
    newRestaurantName: "",
  }

  const [state, setState] = useState(initialState);

  const submitOrder = async () => {
    // TODO Refactors
    try {
      const res = await postLineFoods({
        foodId: state.selectedFood.id,
        count: state.selectedFoodCount,
      });
      history.push("/orders");
    } catch (e) {
      if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
        setState({
          ...state,
          isOpenOrderDialog: false,
          isOpenNewOrderDialog: true,
          existingRestaurantName: e.response.data.existing_restaurant,
          newRestaurantName: e.response.data.new_restaurant,
        });
      } else {
        throw e;
      }
    }
  };

  const replaceOrder = async () => {
    const res = await replaceLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    });
    history.push("/orders");
  };

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(match.params.restaurantsId)
      .then((res) => {
        console.log(res);
        dispatch({
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: {
            foods: res.data.foods,
          }
        });
      })
  }, [])

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {
          foodsState.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              {
                [...Array(12).keys()].map((i) =>
                  <ItemWrapper key={i}>
                    <Skelton key={i} variant="rect" width={450} height={180} />
                  </ItemWrapper>
                )
              }
            </Fragment>
            :
            foodsState.foodsList.map((food) =>
              <ItemWrapper key={food.id}>
                <FoodWrapper
                  food={food}
                  onClickFoodWrapper={
                    (food) => setState({
                      ...state,
                      isOpenOrderDialog: true,
                      selectedFood: food,
                    })
                  }
                  imageUrl={FoodImage}>
                </FoodWrapper>
              </ItemWrapper>
            )
        }
      </FoodsList>
      {
        // TODO refactors
        state.isOpenOrderDialog &&
        <FoodOrderDialog
          food={state.selectedFood}
          isOpen={state.isOpenOrderDialog}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() => setState({
            ...state,
            selectedFoodCount: state.selectedFoodCount + 1,
          })}
          onClickCountDown={() => setState({
            ...state,
            selectedFoodCount: state.selectedFoodCount - 1,
          })}
          onClickOrder={() => submitOrder()}
          // モーダルを閉じる時は全てのstateを初期化する
          onClose={() => setState({
            ...state,
            isOpenOrderDialog: false,
            selectedFood: null,
            selectedFoodCount: 1,
          })}
        />
      }
      {
        state.isOpenNewOrderDialog &&
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          onClose={() => setState(
            {
              ...state,
              isOpenNewOrderDialog: false,
            }
          )}
          existingRestaurantName={state.existingRestaurantName}
          newRestaurantName={state.newRestaurantName}
          onClickSubmit={() => replaceOrder()}
        />
      }
    </Fragment >
  );
}
