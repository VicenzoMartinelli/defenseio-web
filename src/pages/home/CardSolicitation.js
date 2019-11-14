import React from 'react'

import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Chip, Grid, Paper, IconButton } from '@material-ui/core'
import { Check, ThumbDown, CalendarTodayOutlined, Schedule, Person, Map, Room, Money } from '@material-ui/icons';
import { modalityTypes } from 'services/enums';
import moment from 'moment';
import FlexBox from 'components/FlexBox';
import { toLocalDateShortString } from 'services/date-utils';
import clsx from 'clsx';

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
    calendarDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    calendarDivItem: {
        width: '50%'
    },
    alignCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    marginLeft: {
        marginLeft: 10
    }
}));

const CardSolicitation = ({ solicitation, handleAccept, handleRecuse }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <div className={classes.section1}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h6" className={classes.alignCenter}>
                            <Person fontSize="large" /> {solicitation.client.name}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            <FlexBox className={classes.calendarDiv}>
                                <FlexBox className={classes.calendarDivItem} alignItems="center">
                                    {toLocalDateShortString(solicitation.startDateTime)}
                                    <CalendarTodayOutlined className={classes.marginLeft} />
                                </FlexBox>
                                <FlexBox className={classes.calendarDivItem} justify="flex-end" alignItems="center">
                                    {solicitation.turnStart}
                                    <Schedule className={classes.marginLeft} />
                                </FlexBox>
                            </FlexBox>
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Divider variant="middle" />
            <div className={clsx(classes.section2, classes.alignCenter)}>
                <Room fontSize="large" /> {`${solicitation.location.address} Nº: ${solicitation.location.addressNumber}, ${solicitation.location.burgh}, ${solicitation.location.cep}`}
            </div>
            <div className={clsx(classes.section2, classes.alignCenter)}>
                <Money fontSize="large" />{'Valor previsto: R$ ' + solicitation.finalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className={classes.section2}>
                <div>
                    <Chip color='primary' className={classes.chip} label={modalityTypes[solicitation.modalityType]} />
                </div>
            </div>
            <div className={classes.section3}>
                <IconButton
                    onClick={() => handleAccept(solicitation.id)}
                    aria-label="edit">
                    <Check />
                </IconButton>
                <IconButton
                    onClick={() => handleRecuse(solicitation.id)}
                    aria-label="delete">
                    <ThumbDown color={'error'} />
                </IconButton>
            </div>
        </Paper>
    )
}

CardSolicitation.propTypes = {
    solicitation: PropTypes.object.isRequired
}

export default CardSolicitation;