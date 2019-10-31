import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Hidden
} from "@material-ui/core";
import {
  LockOutlined,
  AccountCircleOutlined,
  InputOutlined
} from "@material-ui/icons";
import * as Yup from "yup";
import { useToasts } from "react-toast-notifications";
import { Formik, Form } from "formik";
import * as auth from "../../services/auth";
import FlexBox from "components/FlexBox";
import FormikTextInput from "components/FormikTextInput";
import useLoginStyle from "./login-style";
import { useRouter } from "hooks/useRouter";

const valSchema = Yup.object().shape({
  documentIdentifier: Yup.string()
    .length(14, "Informe um cnpj válido")
    .required("Informe o cnpj"),
  password: Yup.string().required("Informe a senha")
});

const LoginPage = props => {
  const classes = useLoginStyle();
  const { addToast } = useToasts();
  const router = useRouter();

  const initial = {
    documentIdentifier: "",
    password: ""
  };

  function onSubmit(values, actions) {
    actions.setSubmitting(true);

    auth
      .login(values)
      .then(res => {
        actions.setSubmitting(false);
        res = res.data;

        if (!res.isSuccess) {
          addToast("Não foi possível efetuar o login", {
            appearance: "error",
            autoDismiss: true
          });
          return;
        }

        addToast("Login ok!", { appearance: "success", autoDismiss: true });
        setTimeout(() => {
          router.push("/home");
        });
      })
      .catch(err => {
        actions.setSubmitting(false);
        addToast(err, { appearance: "error", autoDismiss: true });
      });
  }

  const handleRegisterClick = useCallback(() => {
    router.push("/register");
  });

  useEffect(() => {
    if (auth.loggedIn()) router.push("/");
  }, []);

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <Grid className={classes.fullHeight} container spacing={0}>
          <Hidden smDown>
            <Grid item sm={12} md={7} lg={7}>
              <Container className={classes.containerLogo}>
                <></>
              </Container>
            </Grid>
          </Hidden>
          <Grid item sm={12} md={5} lg={5}>
            <FlexBox
              container
              alignItems="flex-start"
              justify="center"
              direction="column"
              wrap="nowrap"
              padd="10% 15%"
            >
              <Typography variant="h4" color="primary">
                Bem vindo ao DefenseIO
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                Faça seu login
              </Typography>
              <Formik
                onSubmit={onSubmit}
                validationSchema={valSchema}
                initialValues={initial}
              >
                {props => (
                  <Form noValidate style={{ width: "100%", height: "100%" }}>
                    <FormikTextInput
                      name="documentIdentifier"
                      label="Seu CNPJ: *"
                      autoFocus
                      autoComplete="off"
                      fullWidth={true}
                      formik={props}
                      startIconAdornment={AccountCircleOutlined}
                    />
                    <FormikTextInput
                      name="password"
                      label="Sua senha: *"
                      type="password"
                      fullWidth={true}
                      formik={props}
                      startIconAdornment={LockOutlined}
                    />
                    <FlexBox
                      container
                      alignItems="flex-start"
                      justify="start"
                      direction="column"
                      margin="0 0 50 0"
                    >
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        disabled={props.isSubmitting}
                        endIcon={<InputOutlined />}
                      >
                        Entrar
                      </Button>

                      <Button
                        variant="text"
                        disabled={props.isSubmitting}
                        className={[classes.registerButton]}
                        onClick={handleRegisterClick}
                      >
                        Não possuo um cadastro
                      </Button>
                    </FlexBox>
                  </Form>
                )}
              </Formik>
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
