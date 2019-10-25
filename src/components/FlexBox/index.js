import React from "react";
import styled, { css } from "styled-components";
import { Grid } from "@material-ui/core";

const FlexGrid = styled(Grid)`
  ${({ padd }) =>
    padd &&
    css`
      padding: ${padd};
    `}
    height: '100%;'
`;

const FlexBox = ({ padd, margin, children, ...gridProps }) => {
  return (
    <FlexGrid padd={padd} margin={margin} {...gridProps}>
      {children}
    </FlexGrid>
  );
};

export default FlexBox;
