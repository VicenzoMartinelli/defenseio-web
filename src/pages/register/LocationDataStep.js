import React, { useState, useEffect, memo, useContext } from "react";
import { LocationCityOutlined, LocationOnOutlined } from "@material-ui/icons";
import { findDistricts, findCities } from "services/api";
import { Grid, Button } from "@material-ui/core";
import FormikSelect from "components/FormikSelect";
import FormikTextInput from "components/FormikTextInput";
import { GeocodeContext } from "contexts/GeocodeProvider";
import FlexBox from "components/FlexBox";
import { Formik, Form } from "formik";
import useRegisterStyle from "./style";
import * as Yup from "yup";
import RegisterContext from "./RegisterContext";
import { useToasts } from "react-toast-notifications";

const LocationDataStep = memo(({ next, back }) => {
  const valSchema = memo(() =>
    Yup.object().shape({
      cep: Yup.string().required("Informe o cep"),
      address: Yup.string().required("Informe o endereço"),
      addressNumber: Yup.string().required("Informe o número do endereço"),
      complement: Yup.string(),
      burgh: Yup.string().required("Informe o bairro"),
      cityId: Yup.string().required("Informe a cidade")
    })
  );

  const classes = useRegisterStyle();
  const data = useContext(RegisterContext);
  const { updateStepTwo } = data;
  const geocode = useContext(GeocodeContext);
  const { addToast } = useToasts();

  const [districtId, setDistrictId] = useState(data.districtId);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [localiz, setLocaliz] = useState(null);

  useEffect(() => {
    if (localiz && localiz.lat && localiz.lng) {
      updateStepTwo({
        latitude: localiz.lat,
        longitude: localiz.lng
      });
    }
  }, [localiz, updateStepTwo]);

  useEffect(() => {
    if (localiz && data.longitude !== 0 && data.latitude !== 0) {
      next();
    }
  }, [data, next]);

  function handleSubmit(values, { setSubmitting }) {
    setSubmitting(true);

    updateStepTwo(values);

    geocode
      .fromAddress(
        `${values["district"]}, ${values["city"]}, ${values["cep"]}, ${
          values["address"]
        }, ${values["addressNumber"]}`
      )
      .then(response => {
        try {
          const { lat, lng } = response.results[0].geometry.location;

          setLocaliz({ lat, lng });
        } catch {
          addToast("Endereço inválido", {
            appearance: "error",
            autoDismiss: true
          });
        }
      })
      .catch(() => {
        addToast("Endereço inválido", {
          appearance: "error",
          autoDismiss: true
        });
        updateStepTwo(values);
      });
  }

  useEffect(() => {
    async function loadData() {
      try {
        const r = await findDistricts();

        setDistricts(r.data);
      } catch (err) {}
    }
    loadData();
  }, []);

  useEffect(() => {
    if (districtId && districtId !== "") {
      async function loadData() {
        try {
          const r = await findCities(districtId);

          setCities(r.data);
        } catch (err) {}
      }

      loadData();
    } else {
      setCities([]);
    }
  }, [districtId]);

  return (
    <Formik
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validationSchema={valSchema}
      initialValues={data}
    >
      {props => (
        <Form noValidate style={{ width: "100%", height: "100%" }}>
          <Grid container style={{ padding: "20px" }}>
            <Grid container item sm={12} md={12} lg={12} spacing={2}>
              <Grid item sm={12} md={4} lg={4}>
                <FormikSelect
                  name="districtId"
                  label="Estado *"
                  autoFocus
                  fullWidth={true}
                  formik={props}
                  data={districts}
                  startIconAdornment={LocationCityOutlined}
                  onChangeValue={(val, text) => {
                    props.setFieldValue("district", text);
                    props.setFieldValue("cityId", "");
                    props.setFieldValue("city", "");

                    setDistrictId(val);
                  }}
                />
              </Grid>

              <Grid item sm={12} md={4} lg={4}>
                <FormikSelect
                  name="cityId"
                  label="Cidade *"
                  fullWidth={true}
                  formik={props}
                  data={cities}
                  startIconAdornment={LocationCityOutlined}
                  onChangeValue={(val, text) => {
                    props.setFieldValue("city", text);
                  }}
                />
              </Grid>

              <Grid item sm={12} md={4} lg={4}>
                <FormikTextInput
                  name="burgh"
                  label="Bairro *"
                  fullWidth={true}
                  formik={props}
                  startIconAdornment={LocationCityOutlined}
                />
              </Grid>
            </Grid>

            <Grid container item sm={12} md={12} lg={12} spacing={1}>
              <Grid item sm={12} md={4} lg={4}>
                <FormikTextInput
                  name="address"
                  label="Endereço *"
                  fullWidth={true}
                  formik={props}
                  startIconAdornment={LocationOnOutlined}
                />
              </Grid>

              <Grid item container sm={12} md={4} lg={4} spacing={1}>
                <Grid item sm={12} md={6} lg={6}>
                  <FormikTextInput
                    name="addressNumber"
                    label="Nº do endereço *"
                    fullWidth={true}
                    formik={props}
                    startIconAdornment={LocationOnOutlined}
                  />
                </Grid>

                <Grid item sm={12} md={6} lg={6}>
                  <FormikTextInput
                    name="cep"
                    label="CEP *"
                    fullWidth={true}
                    formik={props}
                    startIconAdornment={LocationOnOutlined}
                  />
                </Grid>
              </Grid>

              <Grid item container sm={12} md={4} lg={4} spacing={1}>
                <Grid item sm={12} md={12} lg={12}>
                  <FormikTextInput
                    name="complement"
                    label="Complemento *"
                    fullWidth={true}
                    formik={props}
                    startIconAdornment={LocationOnOutlined}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <FlexBox
            className={classes.footerContainer}
            direction="row"
            justify="space-between"
          >
            <Button
              className={classes.backButton}
              onClick={back}
              variant="outlined"
            >
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

export default LocationDataStep;
