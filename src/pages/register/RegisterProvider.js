import React, { useState } from "react";
import moment from "moment";
import { register } from "services/auth";
import { useToasts } from "react-toast-notifications/dist/ToastProvider";
import RegisterContext from "./RegisterContext";

const RegisterProvider = ({ children }) => {
  const { addToast } = useToasts();

  const [data, setData] = useState({
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
    updateStepOne: handleUpdateStep,
    updateStepTwo: handleUpdateStep,
    handleSubmitRegister: handleRegister,
    updateDataField: handleUpdateField,
    getStepOneData: handleGetStepOneData,
    getStepTwoData: handleGetStepTwoData
  });

  function handleUpdateStep(stepData) {
    console.log("data-old", data);
    console.log("data-new", stepData);
    console.log("data-mixed", { ...data, ...stepData });

    setData({
      ...data,
      ...stepData
    });

    console.log("data-pos-change", data);
  }

  function handleUpdateField(name, value) {
    setData({
      ...data,
      [name]: value
    });
  }

  function handleRegister() {
    register(data)
      .then(res => {
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
      })
      .catch(err => {
        addToast(err, { appearance: "error", autoDismiss: true });
      });
  }

  function handleGetStepOneData() {
    const {
      name,
      email,
      password,
      phoneNumber,
      brazilianInscricaoEstadual,
      confirmPassword,
      documentIdentifier,
      licenseValidity
    } = data;
    console.log("data", data);

    return {
      name,
      email,
      password,
      phoneNumber,
      brazilianInscricaoEstadual,
      confirmPassword,
      documentIdentifier,
      licenseValidity
    };
  }

  function handleGetStepTwoData() {
    const {
      longitude,
      latitude,
      cep,
      address,
      addressNumber,
      complement,
      burgh,
      cityId,
      districtId
    } = data;

    return {
      longitude,
      latitude,
      cep,
      address,
      addressNumber,
      complement,
      burgh,
      cityId,
      districtId
    };
  }

  return (
    <RegisterContext.Provider value={data}>{children}</RegisterContext.Provider>
  );
};

export default RegisterProvider;
