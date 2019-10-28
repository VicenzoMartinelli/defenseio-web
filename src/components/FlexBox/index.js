import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Grid } from "@material-ui/core";

const FlexGrid = styled(Grid)`
  display: flex;
  ${({ padd }) =>
    padd &&
    css`
      padding: ${padd};
    `}
    ${({ margin }) =>
      margin &&
      css`
        margin: ${margin};
      `}

`;

const FlexBox = ({ padd, margin, children, max, ...gridProps }) => {
  return (
    <FlexGrid container max={max} padd={padd} margin={margin} {...gridProps}>
      {children}
    </FlexGrid>
  );
};

FlexBox.propTypes = {};

FlexBox.defaultProps = {
  max: "false"
};

export default FlexBox;
