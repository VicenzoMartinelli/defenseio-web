import React, { useState } from "react";
import moment from "moment";
import RegisterContext from "./RegisterContext";

const RegisterProvider = ({ children }) => {
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
    districtId: ""
  });

  function handleUpdateStep(stepData) {
    setData({
      ...data,
      ...stepData
    });
  }

  function handleUpdateField(name, value) {
    setData({
      ...data,
      [name]: value
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

  function handleGetData(){
    return data;
  }

  const val = {
    ...data,
    handleGetData,
    updateStepOne: handleUpdateStep,
    updateStepTwo: handleUpdateStep,
    updateDataField: handleUpdateField,
    getStepOneData: handleGetStepOneData,
    getStepTwoData: handleGetStepTwoData
  };

  return (
    <RegisterContext.Provider value={val}>{children}</RegisterContext.Provider>
  );
};

export default RegisterProvider;
