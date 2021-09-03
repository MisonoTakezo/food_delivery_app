import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// components
import { LocalMallIcon, QueryBuilderIcon } from "./icons";

// constants
import { FONT_SIZE } from "../style_constants";

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AmountText = styled.p`
  font-size: ${FONT_SIZE.STAND_BODY};
  font-weight: bold;
`;

export const OrderDetailItem = (
  {
    restaurantId,
    restaurantName,
    restaurantFee,
    timeRequired,
    foodCount,
    price,
  }
) => (
  <Fragment>
    <LineWrapper>
      <LocalMallIcon />
      <Link to={`/restaurants/${restaurantId}/foods`}>
        {restaurantName}
      </Link>
    </LineWrapper>
    <LineWrapper>
      <QueryBuilderIcon>
        {timeRequired}分で到着予定
      </QueryBuilderIcon>
    </LineWrapper>
    <LineWrapper>
      <p>
        商品数
      </p>
      <p>
        {foodCount}
      </p>
    </LineWrapper>
    <LineWrapper>
      <p>
        配送料
      </p>
      <p>
        ¥ {restaurantFee}
      </p>
    </LineWrapper>
    <LineWrapper>
      <AmountText>
        合計
      </AmountText>
      <AmountText>
        ¥ {price + restaurantFee}
      </AmountText>
    </LineWrapper>
  </Fragment>
);

