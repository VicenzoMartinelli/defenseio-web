import React from 'react'

import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Chip, Grid, Paper, IconButton } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.palette.background.paper,
    },
    chip: {
        marginRight: theme.spacing(1),
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: theme.spacing(3, 1, 1),
    },
}));

const CardAttendedModality = ({ attendedModality, bilingMethods, handleClickDelete, handleClickEdit }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <div className={classes.section1}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h6">
                            {attendedModality.modality.description}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            {'R$ ' + attendedModality.basicValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Divider variant="middle" />
            <div className={classes.section2}>
                <div>
                    <Chip color='primary' className={classes.chip} label={bilingMethods[attendedModality.method]} />
                    {attendedModality.multiplyByEmployeesNumber && <Chip color='secondary' className={classes.chip} label="Por funcionário" />}
                </div>
            </div>
            <div className={classes.section3}>
                <IconButton
                    onClick={() => handleClickEdit(attendedModality)}
                    aria-label="edit">
                    <Edit />
                </IconButton>
                <IconButton
                    onClick={() => handleClickDelete(attendedModality)}
                    aria-label="delete">
                    <Delete color={'error'} />
                </IconButton>
            </div>
        </Paper>
    )
}

CardAttendedModality.propTypes = {
    attendedModality: PropTypes.object.isRequired
}

export default CardAttendedModality;