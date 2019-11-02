import React, { useCallback, useState, useEffect, useMemo } from 'react'

import PropTypes from 'prop-types'

import { saveAttendedModality } from '../../services/api';
import { useToasts } from "react-toast-notifications";
import * as Yup from "yup";

import { Dialog, AppBar, Toolbar, Typography, makeStyles, Slide, IconButton, Grid, FormControlLabel, Checkbox, Button, Drawer, Box } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { MaximizeOutlined, BookmarkOutlined, AttachMoneyOutlined } from '@material-ui/icons';
import FormikSelect from 'components/FormikSelect';
import FormikTextInput from 'components/FormikTextInput';
import NumberFormat from 'react-number-format';
import { Form, Formik } from 'formik';
import FlexBox from 'components/FlexBox';

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(20),
        paddingRight: theme.spacing(20)
    },
    appBar: {
        position: 'relative',
        backgroundColor: '#FFF',
        boxShadow: 'none',
        border: 'none',
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}))

const valSchema = Yup.object({
    method: Yup.number().oneOf([0, 1, 2, 3], "Valor inválido"),
    basicValue: Yup.number().positive('Valor base inválido'),
    modalityId: Yup.string().required('Selecione a modalidade')
})

const AttendedModalityForm = ({ openDialog, onCloseDialog, modalities, bilingMethods, attendedModality = {
    id: '',
    method: 0,
    basicValue: 0,
    multiplyByEmployeesNumber: false,
    modalityId: ''
} }) => {

    if (!attendedModality.modalityId && attendedModality.modality) {
        attendedModality.modalityId = attendedModality.modality.id;
    }

    const classes = useStyles()
    const { addToast } = useToasts();

    const handleSubmitCreate = useCallback(
        (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);

            saveAttendedModality(values)
                .then(res => {
                    resetForm(res)

                    addToast("Registro salvo com sucesso!", {
                        appearance: "success",
                        autoDismiss: true
                    });

                    onCloseDialog()
                })
                .catch(e => {
                    addToast("Não foi possível realizar o cadastro", { appearance: "error", autoDismiss: true });
                })
                .finally(() => {
                    setSubmitting(false)
                });
        },
        [addToast, onCloseDialog]
    );

    const bilingMethodsWithValues = useMemo(() => bilingMethods.map((x, i) => ({ id: i, name: x })));

    return (
        <Box>
            <Drawer 
                anchor="right"
                open={openDialog}
                onClose={onCloseDialog}
                SlideProps={{ direction: "left" }}
                PaperProps={{ style: { width: 350 } }}
            >
                <AppBar color='default' className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Modalidade atendida
                        </Typography>

                        <IconButton edge="end" onClick={onCloseDialog} aria-label="close">
                            <CloseIcon color="primary" />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Formik
                    onSubmit={handleSubmitCreate}
                    validateOnBlur={false}
                    validationSchema={valSchema}
                    initialValues={attendedModality}
                >
                    {props => (
                        <Form noValidate style={{ width: "100%", height: "100%" }}>
                            <Grid container style={{ padding: "20px" }}>
                                <Grid item sm={12} >
                                    <FormikSelect
                                        name="modalityId"
                                        label="Modalidade *"
                                        valueProp="id"
                                        nameProp="description"
                                        fullWidth={true}
                                        formik={props}
                                        data={modalities}
                                        startIconAdornment={BookmarkOutlined}
                                    />
                                </Grid>

                                <Grid item sm={12} >
                                    <FormikSelect
                                        name="method"
                                        label="Método de cobrança *"
                                        fullWidth={true}
                                        formik={props}
                                        data={bilingMethodsWithValues}
                                        startIconAdornment={BookmarkOutlined}
                                    />
                                </Grid>

                                <Grid item sm={12} >
                                    <NumberFormat
                                        customInput={FormikTextInput}
                                        formik={props}
                                        name="basicValue"
                                        label="Valor base *"
                                        fullWidth={true}
                                        formik={props}
                                        startIconAdornment={AttachMoneyOutlined}
                                    />
                                </Grid>

                                <Grid item sm={12} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={props.values.multiplyByEmployeesNumber ? 'checked' : ''}
                                                checked={props.values.multiplyByEmployeesNumber}
                                                onChange={props.handleChange}
                                                name='multiplyByEmployeesNumber'
                                                color="primary"
                                            />
                                        }
                                        label="Multiplicar valor por número de funcionários"
                                    />
                                </Grid>

                                <FlexBox
                                    item
                                    sm={12}
                                    direction="row"
                                    justify="space-between"
                                >
                                    <Button onClick={onCloseDialog} variant="outlined">
                                        Cancelar
                                    </Button>
                                    <Button variant="contained" color="primary" type="submit">
                                        Salvar
                                    </Button>
                                </FlexBox>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Drawer>
        </Box>
    )
}

AttendedModalityForm.propTypes = {
    openDialog: PropTypes.bool.isRequired,
    onCloseDialog: PropTypes.func.isRequired
}

export default AttendedModalityForm;
