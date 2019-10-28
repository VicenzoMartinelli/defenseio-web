import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, Typography, Icon } from "@material-ui/core";

const FormikTextInput = props => {
  const {
    label,
    type,
    name,
    fullWidth,
    startIconAdornment,
    formik,
    ...inputProps
  } = props;
  const { values, errors, isSubmitting, touched, handleChange } = formik;

  const StartIcon = startIconAdornment;

  const [focused, setFocused] = useState(false);
  
  return (
    <TextField
      {...inputProps}
      id={name}
      name={name}
      label={label}
      type={type}
      margin="normal"
      variant="outlined"
      fullWidth={fullWidth}
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={() => setFocused(false)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <StartIcon
              color={
                focused
                  ? errors[name] !== undefined && touched[name]
                    ? "error"
                    : "primary"
                  : "inherit"
              }
            />
          </InputAdornment>
        )
      }}
      value={values[name]}
      onChange={handleChange}
      error={touched[name] && errors[name] ? true : false}
      disabled={isSubmitting}
      helperText={
        touched[name] &&
        errors[name] && (
          <Typography variant="caption" color="error">
            {errors[name]}
          </Typography>
        )
      }
    />
  );
};

FormikTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  startIconAdornment: PropTypes.any,
  formik: PropTypes.any
};

FormikTextInput.defaultProps = {
  type: "text"
};

export default FormikTextInput;
