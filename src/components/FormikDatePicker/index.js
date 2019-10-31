import React, { useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { CalendarTodayOutlined } from "@material-ui/icons";

const FormikDatePicker = props => {
  const { label, type, name, fullWidth, formik, ...inputProps } = props;
  const { values, errors, isSubmitting, touched, setFieldValue } = formik;

  const [focused, setFocused] = useState(false);

  return (
    <KeyboardDatePicker
      {...inputProps}
      disableToolbar
      variant="inline"
      inputVariant="outlined"
      fullWidth={fullWidth}
      onOpen={() => {
        setFocused(true);
      }}
      onClose={() => setFocused(false)}
      keyboardIcon={
        <CalendarTodayOutlined
          color={
            focused
              ? errors[name] !== undefined && touched[name]
                ? "error"
                : "primary"
              : "inherit"
          }
        />
      }
      inputProps={{
        disabled: false
      }}
      InputAdornmentProps={{ position: "start" }}
      invalidDateMessage={"Data em formato inválido"}
      format="DD/MM/YYYY"
      margin="normal"
      id={name}
      name={name}
      label={label}
      KeyboardButtonProps={{
        "aria-label": "change date"
      }}
      value={values[name]}
      onChange={date => {
        setFieldValue(name, date);
      }}
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

FormikDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  startIconAdornment: PropTypes.any,
  formik: PropTypes.any
};

FormikDatePicker.defaultProps = {};

export default FormikDatePicker;
