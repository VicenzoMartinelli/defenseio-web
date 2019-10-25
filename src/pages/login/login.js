import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
  TextField,
  Box,
  Hidden,
  Fab
} from "@material-ui/core";
import { Email, LockOutlined, NavigationOutlined } from "@material-ui/icons";
import * as Yup from "yup";
import { useToasts } from "react-toast-notifications";
import { Formik } from "formik";
import * as auth from "../../services/auth";
import history from "../../history";
import homeLogo from "../../assets/home-logo.svg";
import back from "../../assets/back.svg";
import FlexBox from "components/FlexBox";

const valSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Informe um email válido"),
  password: Yup.string()
    .required("Informe a senha")
    .min(6, "A senha deve possuir no mínimo 6 caracteres")
});

const useStyles = makeStyles({
  root: {
    height: "100vh",
    background: `url('${back}')`,
    backgroundSize: "100%",
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    minWidth: "80%",
    height: "70%",
    borderRadius: 20,
    boxShadow: "2px 3px 13px 5px rgba(0,0,0,0.2)"
  },
  fullHeight: {
    height: "100%"
  },
  containerLogo: {
    height: "100%",
    width: "100%",
    background: `url('${homeLogo}')`,
    backgroundSize: "70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const LoginPage = props => {
  const classes = useStyles();
  const { addToast } = useToasts();

  const onSubmit = (values, bag) => {
    bag.setSubmitting(true);

    auth
      .login(values.email, values.password)
      .then(res => {
        if (res.success !== undefined && !res.success) {
          addToast(res.msg, { appearance: "error", autoDismiss: true });
          return;
        }

        history.push("/");
      })
      .catch(err => {
        console.log(err);
        addToast(err, { appearance: "error", autoDismiss: true });
      });
  };

  useEffect(() => {
    if (auth.loggedIn()) history.push("/");
  }, []);

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <Grid className={classes.fullHeight} container spacing={0}>
          <Hidden smDown>
            <Grid item sm={0} md={7} lg={7}>
              <Container className={classes.containerLogo}></Container>
            </Grid>
          </Hidden>
          <Grid item sm={12} md={5} lg={5}>
            <FlexBox container alignItems="flex-start" justify="center" direction="column" padd="10% 15%">
              <Typography variant="h4" color="primary">
                Bem vindo ao DefenseIO
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                Faça seu login
              </Typography>

              <TextField
                id="outlined-name"
                label="Seu cnpj*"
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="outlined-name"
                label="Sua senha*"
                margin="normal"
                type="password"
                variant="outlined"
                fullWidth
              />

              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.margin}
              >
                Entrar
              </Button>
            </FlexBox>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
LoginPage.propTypes = {
  classes: PropTypes.object
};

export default LoginPage;
