import React, { memo, useContext } from "react";
import { Grid, Button } from "@material-ui/core";
import FormikTextInput from "components/FormikTextInput";
import FormikDatePicker from "components/FormikDatePicker";
import {
  AccountCircleOutlined,
  AssignmentIndOutlined,
  PhoneAndroidOutlined,
  EmailOutlined,
  LockOutlined
} from "@material-ui/icons";
import FlexBox from "components/FlexBox";
import { Form, Formik } from "formik";
import useRegisterStyle from "./style";
import * as Yup from "yup";
import RegisterContext from "./RegisterContext";

const BasicDataStep = memo(({ next }) => {
  const classes = useRegisterStyle();
  const context = useContext(RegisterContext);

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
    brazilianInscricaoEstadual: Yup.string()
      .required("Informe sua inscrição estadual"),
    licenseValidity: Yup.date().typeError("Insira uma data válida").required("Informe a data de validate")
  });

  function handleSubmit(values, actions) {
    actions.setSubmitting(true);

    context.updateStepOne(values);

    next();
  }

  const initial = context.getStepOneData();

  console.log("initial", initial);

  return (
    <Formik
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validationSchema={valSchema}
      initialValues={initial}
    >
      {props => (
        <Form noValidate style={{ width: "100%", height: "100%" }}>
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

          <FlexBox
            className={classes.footerContainer}
            direction="row"
            justify="space-between"
          >
            <Button className={classes.backButton} disabled variant="outlined">
              Voltar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {"Continuar"}
            </Button>
          </FlexBox>
        </Form>
      )}
    </Formik>
  );
});

export default BasicDataStep;
