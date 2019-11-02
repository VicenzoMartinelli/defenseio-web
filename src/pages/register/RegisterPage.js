import React, { useCallback, useState } from "react";
import { Card, Grid, Box, Stepper, Step, StepLabel } from "@material-ui/core";
import FlexBox from "components/FlexBox";
import useRegisterStyle from "./style";
import LocationDataStep from "./LocationDataStep";
import BasicDataStep from "./BasicDataStep";
import ConclusionStep from "./ConclusionStep";

const RegisterPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const classes = useRegisterStyle();

  const getSteps = useCallback(() => {
    return ["Dados básicos", "Localização", "Modalidades"];
  }, []);

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <BasicDataStep next={handleNext} />;
      case 1:
        return <LocationDataStep next={handleNext} back={handleBack} />;
      case 2:
        return <ConclusionStep back={handleBack} />;
      default:
        return "";
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <Grid className={classes.fullHeight} container spacing={0}>
          <FlexBox
            container
            alignItems="flex-start"
            justify="center"
            direction="column"
            wrap="nowrap"
          >
            <Stepper
              style={{ height: "20%", width: "100%" }}
              activeStep={activeStep}
              alternativeLabel
              className={classes.step}
            >
              {getSteps().map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <FlexBox direction="column" style={{ height: "80%" }}>
              {getStepContent()}
            </FlexBox>
          </FlexBox>
        </Grid>
      </Card>
    </Box>
  );
};

RegisterPage.propTypes = {};

export default RegisterPage;
