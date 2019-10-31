import React from "react";
import RegisterProvider from "./RegisterProvider";
import RegisterPage from "./RegisterPage";

const Register = () => {
  return (
    <RegisterProvider>
      <RegisterPage />
    </RegisterProvider>
  );
};

export default Register;
