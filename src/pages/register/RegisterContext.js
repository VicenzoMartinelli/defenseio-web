import { createContext } from "react";
import moment from "moment";

const RegisterContext = createContext({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  documentIdentifier: "",
  brazilianInscricaoEstadual: "",
  licenseValidity: moment(),

  longitude: 0,
  latitude: 0,
  cep: "",
  address: "",
  addressNumber: "",
  complement: "",
  burgh: "",
  cityId: "",
  districtId: "",
  handleGetData: () => {},
  updateStepOne: () => {},
  updateStepTwo: () => {},
  updateDataField: () => {},
  getStepOneData: () => {},
  getStepTwoData: () => {}
});

export default RegisterContext;