import React from "react";

// styled components CSS in JS
import { RoundButton } from "../shared_style";

export const CountUpButton = ({ onClick, isDisabled }) => (
  <RoundButton onClick={onClick} disable={isDisabled}>
    +
  </RoundButton>
)
