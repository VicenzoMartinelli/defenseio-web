import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  menu: {
    width: 200
  }
}));

const FormikSelect = props => {
  const {
    label,
    type,
    name,
    fullWidth,
    startIconAdornment,
    formik,
    data,
    onChangeValue,
    ...restProps
  } = props;
  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    setFieldValue
  } = formik;

  const Icon = startIconAdornment;

  const [focused, setFocused] = useState(false);

  const classes = useStyles();

  return (
    <TextField
      {...restProps}
      select
      id={name}
      name={name}
      label={label}
      margin="normal"
      variant="outlined"
      fullWidth={fullWidth}
      onFocus={() => {
        setFocused(true);
      }}
      onBlur={() => setFocused(false)}
      SelectProps={{
        MenuProps: {
          className: classes.menu
        },
        variant: "standard"
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon
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
      onChange={e => {
        setFieldValue(name, e.target.value);

        onChangeValue(
          e.target.value,
          e.target.value === ""
            ? ""
            : data.filter(x => x.id === e.target.value)[0].name
        );
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
    >
      <MenuItem value={""}>
        <p></p>
      </MenuItem>
      {data.map(x => (
        <MenuItem key={x.id} value={x.id}>
          {x.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

FormikSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  startIconAdornment: PropTypes.any,
  formik: PropTypes.any,
  data: PropTypes.array,
  onChangeValue: PropTypes.func
};

FormikSelect.defaultProps = {
  onChangeValue: (value, text) => {}
};

export default FormikSelect;
