import React from "react";
import { styled } from "@material-ui/styles";
import { useTheme, Container, Typography } from "@material-ui/core";
import FlexBox from "components/FlexBox";

// import { Container } from './styles';

const NotFound = () => {
  const theme = useTheme();

  return (
    <FlexBox justify="center" alignItems="center" style={{ height: '100%' }}>
      <Typography color="primary" variant="h3">Não encontramos a página :(</Typography>
    </FlexBox>
  )
};

export default NotFound;
