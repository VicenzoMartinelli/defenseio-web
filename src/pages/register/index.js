import React, { useEffect, useCallback, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import {
  Card,
  Grid,
  Box,
  Stepper,
  Step,
  Typography,
  Button,
  StepLabel
} from "@material-ui/core";
import * as Yup from "yup";
import FormikTextInput from "components/FormikTextInput";
import { useToasts } from "react-toast-notifications";
import { Formik, Form } from "formik";
import * as auth from "../../services/auth";
import FlexBox from "components/FlexBox";
import useRegisterStyle from "./style";
import { useRouter } from "hooks/useRouter";
import {
  AccountCircleOutlined,
  AssignmentIndOutlined,
  CalendarTodayOutlined,
  PhoneAndroidOutlined,
  EmailOutlined,
  LockOutlined
} from "@material-ui/icons";
import FormikDatePicker from "components/FormikDatePicker";
import moment from "moment";
import { register } from "../../services/auth";

const valSchema = Yup.object().shape({
  name: Yup.string().required("Informe o nome de sua empresa"),
  email: Yup.string().required("Informe o email"),
  password: Yup.string()
    .required("Informe a senha")
    .min(6, "Informe um senha válida"),
  confirmPassword: Yup.string()
    .required("Informe a senha")
    .min(6, "Informe um senha válida")
    .oneOf([Yup.ref("password")], "As senhas não conferem"),
  phoneNumber: Yup.string()
    .required("Informe o telefone")
    .min(10, "Informe um telefone válido"),
  documentIdentifier: Yup.string()
    .length(14, "Informe um cnpj válido")
    .required("Informe o cnpj"),
  brazilianInscricaoEstadual: Yup.string().required(
    "Informe sua inscrição estadual"
  ),
  licenseValidity: Yup.date().required("Informe a data de validate")
  //   longitude: 0,
  //   latitude: 0,
  //   cep: "85501047",
  //   address: "Rua avenida tupi",
  //   addressNumber: "13",
  //   complement: "1323123",
  //   burgh: "Centro",
  //   cityId: "a3cc291e-f3be-11e9-bfa3-0242ac130002",
});

const RegisterPage = props => {
  const [activeStep, setActiveStep] = useState(0);

  const classes = useRegisterStyle();
  const { addToast } = useToasts();
  const router = useRouter();

  const initial = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    documentIdentifier: "",
    longitude: 0,
    latitude: 0,
    cep: "85501047",
    address: "Rua avenida tupi",
    addressNumber: "13",
    complement: "1323123",
    burgh: "Centro",
    cityId: "a3cc291e-f3be-11e9-bfa3-0242ac130002",
    birthDate: "2019-10-26T03:09:30.185Z",
    kiloMetersSearchRadius: 0,
    brazilianInscricaoEstadual: "",
    licenseValidity: moment()
  };

  const getSteps = useCallback(() => {
    return ["Dados básicos", "Localização", "Modalidades"];
  }, []);

  const getStepContent = (stepIndex, props) => {
    switch (stepIndex) {
      case 0:
        return (
          <Grid container style={{ padding: "20px" }}>
            <Grid container item sm={12} md={12} lg={12} spacing={1}>
              <Grid item sm={12} md={6} lg={6}>
                <FormikTextInput
                  name="name"
                  label="Seu nome *"
                  autoFocus
                  type="text"
                  fullWidth={true}
                  formik={props}
                  startIconAdornment={AccountCircleOutlined}
                />
              </Grid>

              <Grid container item spacing={1} sm={12} md={6} lg={6}>
                <Grid item sm={12} md={6} lg={6}>
                  <FormikTextInput
                    name="documentIdentifier"
                    label="Seu CNPJ *"
                    type="text"
                    fullWidth={true}
                    formik={props}
                    startIconAdornment={AssignmentIndOutlined}
                  />
                </Grid>

                <Grid item sm={12} md={6} lg={6}>
                  <FormikTextInput
                    name="brazilianInscricaoEstadual"
                    label="Sua inscrição estadual *"
                    autoComplete="off"
                    type="number"
                    fullWidth={true}
                    formik={props}
                    startIconAdornment={AssignmentIndOutlined}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container item sm={12} spacing={2}>
              <Grid item sm={12} md={4} lg={4}>
                <FormikTextInput
                  name="email"
                  label="Seu email *"
                  type="email"
                  fullWidth={true}
                  formik={props}
                  startIconAdornment={EmailOutlined}
                />
              </Grid>
              <Grid item sm={12} md={4} lg={4}>
                <FormikTextInput
                  name="phoneNumber"
                  label="Seu telefone *"
                  fullWidth={true}
                  formik={props}
                  startIconAdornment={PhoneAndroidOutlined}
                />
              </Grid>

              <Grid item sm={12} md={4} lg={4}>
                <FormikDatePicker
                  disablePast
                  name="licenseValidity"
                  autoComplete="off"
                  label="Data de término da validade de sua licença *"
                  fullWidth={true}
                  formik={props}
                />
              </Grid>
            </Grid>

            <Grid container item sm={12} spacing={2}>
              <Grid item sm={12} md={6} lg={6}>
                <FormikTextInput
                  name="password"
                  label="Sua senha *"
                  type="password"
                  fullWidth={true}
                  formik={props}
                  startIconAdornment={LockOutlined}
                />
              </Grid>

              <Grid item sm={12} md={6} lg={6}>
                <FormikTextInput
                  name="confirmPassword"
                  label="Sua confirmação de senha *"
                  type="password"
                  fullWidth={true}
                  formik={props}
                  startIconAdornment={LockOutlined}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      case 1:
        return <Typography>DASDSAUDHUSIADAAS</Typography>;
      case 2:
        return <Typography>DASDSAUDHUSIADAAS</Typography>;
      default:
        return "Unknown stepIndex";
    }
  };

  const handleNext = formikProps => {
    formikProps.submitForm();

    if (formikProps.isValid) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true);

    if (activeStep == 0) {
      register(values)
        .then(res => {
          actions.setSubmitting(false);
          res = res.data;

          if (!res.isSuccess) {
            addToast("Não foi possível efetuar o cadastro", {
              appearance: "error",
              autoDismiss: true
            });
            return;
          }

          addToast("Cadastrado efetuado com sucesso!", {
            appearance: "success",
            autoDismiss: true
          });
          setActiveStep(activeStep + 1);
        })
        .catch(err => {
          actions.setSubmitting(false);
          addToast(err, { appearance: "error", autoDismiss: true });
        });
    }
  };

  useEffect(() => {
    if (auth.loggedIn()) router.push("/");
  }, []);

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <Grid className={classes.fullHeight} container spacing={0}>
          <FlexBox
            container
            alignItems="flex-start"
            justify="center"
            direction="column"
            wrap="nowrap"
          >
            <Stepper
              style={{ height: "20%", width: "100%" }}
              activeStep={activeStep}
              alternativeLabel
              className={classes.step}
            >
              {getSteps().map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <FlexBox direction="column" style={{ height: "80%" }}>
              <Formik
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validationSchema={valSchema}
                initialValues={initial}
              >
                {props => (
                  <Form noValidate style={{ width: "100%", height: "100%" }}>
                    {getStepContent(activeStep, props)}

                    <FlexBox
                      className={classes.footerContainer}
                      direction="row"
                      justify="space-between"
                    >
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                        variant="outlined"
                      >
                        Voltar
                      </Button>
                      <Button variant="contained" color="primary" type="submit">
                        {activeStep === getSteps().length - 1
                          ? "Finalizar"
                          : "Continuar"}
                      </Button>
                    </FlexBox>
                  </Form>
                )}
              </Formik>
            </FlexBox>
          </FlexBox>
        </Grid>
      </Card>
    </Box>
  );
};

RegisterPage.propTypes = {};

export default RegisterPage;
