import React, { useEffect, useState, useCallback } from 'react'

import { useAsync } from 'react-async'
import { useToasts } from "react-toast-notifications";

import { Delete, Add as AddIcon } from '@material-ui/icons';
import { Dialog, DialogTitle, DialogActions, Button, makeStyles, InputBase, IconButton, Paper, Grid, Fab, Container } from '@material-ui/core';

import Loading from "../../components/Loading";
import FlexBox from '../../components/FlexBox';
import PageTitle from '../../components/PageTitle';
import DangerButton from '../../components/DangerButton';
import CardAttendedModality from './CardAttendedModality';

import { findAttendedModalities, findModalities, deleteAttendedModality } from '../../services/api';
import AttendedModalityForm from './AttendedModalityForm';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    dialogActions: {
        justifyContent: 'space-around'
    },
    root: {
        padding: 25,
        marginTop: theme.spacing(1.5),
        display: 'flex',
        justifyItems: 'space-between',
        flexDirection: 'column',
        flex: 1,
    },
    fabs: {
        marginRight: theme.spacing(0.5),
        marginLeft: theme.spacing(0.5)
    },
    actions: {
        marginTop: theme.spacing(2)
    },
    list: {
        marginTop: theme.spacing(2)
    },
    deleteButton: {
        borderColor: `${red[700]} !important`,
        color: red[700],
        '&:hover': {
            backgroundColor: '#ff00001f'
        }
    }
}))

const bilingMethodsList = [
    "Hora",
    "Período",
    "Quilômetro",
    "Valor fixo"
];

const Modalities = () => {
    const classes = useStyles()
    const { addToast } = useToasts();

    const { data, isLoading, isResolved, reload } = useAsync(findAttendedModalities)
    const { data: dataModalities, isResolved: isModalitiesResolved } = useAsync(findModalities)

    const [selectedAttendedModality, setSelectedAttendedModality] = useState()
    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [modalities, setModalities] = useState(undefined)
    const [attendedModalities, setAttendedModalities] = useState(undefined)

    useEffect(() => {
        if (isResolved) {
            setAttendedModalities(data.data);
        }
        if (isModalitiesResolved) {
            setModalities(dataModalities.data);
        }
    }, [data, dataModalities]);

    const handleClickDelete = useCallback(attendedModality => {
        setSelectedAttendedModality(attendedModality)
        setOpenDialogDelete(true)
    }, [])

    const handleConfirmDelete = useCallback(() => {
        deleteAttendedModality(selectedAttendedModality.id)
            .then(() => {
                addToast("Registro salvo com sucesso!", {
                    appearance: "success",
                    autoDismiss: true
                });
                setAttendedModalities(
                    attendedModalities.filter(item => {
                        return item !== selectedAttendedModality
                    })
                );
            })
            .catch(e => {
                addToast("Não foi possível realizar a exclusão", { appearance: "error", autoDismiss: true });
            })
        setOpenDialogDelete(false)
    }, [selectedAttendedModality, data, addToast])

    const handleCancelDelete = useCallback(() => {
        setOpenDialogDelete(false)
        setSelectedAttendedModality()
    }, [])

    const handleCreate = useCallback(() => {
        setSelectedAttendedModality()
        setOpenForm(true)
    }, [])

    const handleClickEdit = useCallback((attendedModality) => {
        setSelectedAttendedModality(attendedModality)
        setOpenForm(true)
    }, [])

    const handleCloseForm = useCallback(() => {
        setOpenForm(false)
        reload()
    }, [reload])

    return (
        <>
            <FlexBox justify="flex-start" alignItems="center" spacing={1}>
                <Paper className={classes.root}>
                    <PageTitle label="Modalidades atendidas" />
                    <Grid container item xs={12} justify="flex-start" className={classes.actions}>
                        <Button variant="outlined" aria-label="add" color="primary" className={classes.fabs} onClick={handleCreate}>
                            <AddIcon /> Incluir
                        </Button>
                    </Grid>

                    {isLoading && <Loading contained={false} />}

                    {attendedModalities && attendedModalities.length > 0 && (
                        <Grid container spacing={3} className={classes.list}>
                            {attendedModalities.map((modalidade, index) => {
                                return (
                                    <Grid item xs={12} md={4} lg={3} key={index}>
                                        <CardAttendedModality
                                            bilingMethods={bilingMethodsList}
                                            handleClickEdit={handleClickEdit}
                                            handleClickDelete={handleClickDelete}
                                            attendedModality={modalidade} />
                                    </Grid>
                                )
                            })}

                            <Dialog maxWidth="xs" open={openDialogDelete}>
                                <DialogTitle>Confirma a exclusão da modalidade?</DialogTitle>
                                <DialogActions className={classes.dialogActions}>
                                    <Button variant="outlined" color="secondary" onClick={handleCancelDelete}>
                                        Cancelar
                                    </Button>

                                    <Button variant="outlined" className={classes.deleteButton} onClick={handleConfirmDelete} color="primary">
                                        Confirmar
                            </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    )}
                </Paper>
            </FlexBox>

            {openForm &&
                <AttendedModalityForm
                    openDialog={openForm}
                    onCloseDialog={handleCloseForm}
                    modalities={modalities}
                    bilingMethods={bilingMethodsList}
                    attendedModality={selectedAttendedModality}
                />}
        </>
    )
}
export default Modalities;
