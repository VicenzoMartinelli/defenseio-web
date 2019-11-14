import React, { useState, useCallback, useEffect } from "react";
import FlexBox from "components/FlexBox";
import { Paper, Grid, Button, Dialog, DialogTitle, DialogActions, makeStyles, DialogContent, Typography, TextField } from "@material-ui/core";
import PageTitle from "components/PageTitle";
import Loading from "components/Loading";
import CardSolicitation from "./CardSolicitation";
import { BusinessCenter } from "@material-ui/icons";
import { useToasts } from "react-toast-notifications/dist/ToastProvider";
import { findOpenedSolicitations, recuseSolicitation, acceptSolicitation } from "services/api";
import { useAsync } from "react-async";
import { red } from "@material-ui/core/colors";

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

const Home = props => {
  const classes = useStyles();
  const [solicitations, setSolicitations] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [selectedId, setSelectedId] = useState()
  const [recuse, setRecuse] = useState(false)
  const [employeerNumber, setEmployeersNumber] = useState(1)

  const { addToast } = useToasts();

  const { data, isLoading, isResolved, reload } = useAsync(findOpenedSolicitations);

  const handleCancel = useCallback(() => {
    setOpenConfirmDialog(false)
    setSelectedId()
  }, [])

  const handleAccept = useCallback((id) => {
    setRecuse(false);
    setSelectedId(id);
    setOpenConfirmDialog(true)
  }, [])

  const handleRecuse = useCallback((id) => {
    setRecuse(true);
    setSelectedId(id);
    setOpenConfirmDialog(true)
  }, [])

  const handleConfirmOperation = useCallback(() => {
    const endMethod = () => {
      setOpenConfirmDialog(false);
      setSelectedId();
    }

    if (recuse) {
      console.log(selectedId)

      recuseSolicitation(selectedId)
        .then(() => {
          addToast("Registro recusado com sucesso!", {
            appearance: "success",
            autoDismiss: true
          });
          endMethod();
          reload();
        })
        .catch(e => {
          addToast("Não foi possível recusar a solicitação", { appearance: "error", autoDismiss: true });
        });
    }
    else {
      acceptSolicitation(selectedId, employeerNumber)
        .then(() => {
          addToast("Registro recusado com sucesso!", {
            appearance: "success",
            autoDismiss: true
          });
          endMethod();
          reload();
        })
        .catch(e => {
          addToast("Não foi possível recusar a solicitação", { appearance: "error", autoDismiss: true });
        });
    }
  }, [recuse, selectedId, employeerNumber])

  useEffect(() => {
    if (isResolved) {
      setSolicitations(data.data);
    }
  }, [data]);

  return (
    <FlexBox justify="flex-start" alignItems="center" spacing={1}>
      <Paper className={classes.root}>
        <PageTitle label="Solicitações pendentes" iconComponent={BusinessCenter} />
        <Grid container item xs={12} justify="flex-start" className={classes.actions}>
        </Grid>

        {isLoading && <Loading contained={false} />}

        {solicitations && solicitations.length > 0 && (
          <Grid container spacing={3} className={classes.list}>
            {solicitations.map((solicitation, index) => {
              return (
                <Grid item xs={12} md={4} lg={4} key={index}>
                  <CardSolicitation
                    handleAccept={handleAccept}
                    handleRecuse={handleRecuse}
                    solicitation={solicitation} />
                </Grid>
              )
            })}

            <Dialog maxWidth="xs" open={openConfirmDialog}>
              <DialogTitle>Confirma a operação?</DialogTitle>
              {!recuse && <DialogContent>
                <FlexBox justify="center" alignItems="center" spacing={2}>
                  <Typography variant="caption">Número de funcionários designados</Typography>
                  <TextField
                    variant="outlined"
                    type="number"
                    onChange={(e) => setEmployeersNumber(e.target.value)}
                    value={employeerNumber}
                    fullWidth
                    margin="normal"
                  />
                </FlexBox>
              </DialogContent>}
              <DialogActions className={classes.dialogActions}>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>Cancelar</Button>

                <Button variant="outlined" className={recuse && classes.deleteButton} onClick={handleConfirmOperation} color="primary">
                  Confirmar
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        )}
      </Paper>
    </FlexBox>
  );
};
export default Home;
