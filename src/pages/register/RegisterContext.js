import { createContext } from "react";

const RegisterContext = createContext({
  data: {},
  updateStepOne: () => {},
  updateStepTwo: () => {},
  updateDataField: () => {},
  handleSubmitRegister: () => {},
  getStepOneData: () => {},
  getStepTwoData: () => {}
});

export default RegisterContext;