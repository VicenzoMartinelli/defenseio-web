import React, { useState, useEffect } from "react";
import FlexBox from "components/FlexBox";
import { Paper, Grid, makeStyles, Typography, TextField, ListItem, ListItemIcon, ListItemText, List, Fab } from "@material-ui/core";
import Loading from "components/Loading";
import { PersonOutline, SendOutlined } from "@material-ui/icons";
import { useToasts } from "react-toast-notifications/dist/ToastProvider";
import { useAsync } from "react-async";
import { findNegociations, buildHubConnection, findMessagesFromUser } from "services/api-chat";
import { HubConnectionState } from "@aspnet/signalr";

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
        height: '80vh'
    },
    messagerContainer: {
        display: 'flex',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    negociations: {
        width: '20%',
        paddingRight: 5
    },
    messagesContainer: {
        height: '100%',
        borderLeftWidth: '2px',
        borderLeftColor: theme.palette.primary.main,
        borderLeftStyle: 'solid'
    },
    listMessagesContainer: {
        flex: '9',
        width: '100%',
        maxHeight: '90%',
        overflow: 'auto',
        flexWrap: 'nowrap',
        padding: '0 50px'
    },
    inputContainer: {
        flex: '1',
        width: '100%',
        padding: '0 2%',
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '-1px -2px 5px 0px rgba(0,0,0,0.12)'
    },
    inputMessage: {
        width: '95%'
    }
}))

const Negociations = props => {
    const classes = useStyles();
    const [negociations, setNegociations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [currentNegociation, setCurretNegociation] = useState('');
    const [hubConnect, setHubConnect] = useState(undefined);

    const { addToast } = useToasts();

    const { data, isLoading, isResolved, reload } = useAsync(findNegociations);

    const { data: dataMessages, isResolved: isResolvedMessages, run } = useAsync({
        deferFn: findMessagesFromUser
    });

    const handleItemClick = (neg) => {
        setCurretNegociation(neg.userId);
    }

    const handleSend = () => {
        const msg = {
            clientId: currentNegociation,
            isProviderSend: true,
            isAttachment: false,
            content: message
        };

        setMessage('');
        setMessages([...messages, msg]);
        hubConnect.invoke('sendChatMessage', msg);
    }

    const handleReceiveMessage = (received) => {
        if (received.clientId === currentNegociation) {
            setMessages(msgs => [...msgs, received]);
        }
        else {
            let oldNegociation = negociations.filter(x => x.userId === received.clientId)[0];

            setNegociations(ngs => [{
                ...oldNegociation,
                content: received.content
            }, ...ngs.filter(x => x.userId !== received.clientId)])
        }
    }

    useEffect(() => {
        if (isResolved) {
            setNegociations(data);
        }
    }, [isResolved, data]);

    useEffect(() => {
        if (isResolvedMessages) {
            setMessages(dataMessages);
        }
    }, [isResolvedMessages, dataMessages]);

    useEffect(() => {
        if (currentNegociation && currentNegociation !== "") {
            run(currentNegociation);
        }
    }, [currentNegociation]);

    useEffect(() => {
        async function createHub() {
            const hb = buildHubConnection();

            setHubConnect(hb);

            try {
                await hb.start();
            }
            catch (err) {
                console.log(err)
            }
        }

        createHub();
    }, []);

    useEffect(() => {
        if (hubConnect && hubConnect.state === HubConnectionState.Connected) {
            hubConnect.on('receiveChatMessage', handleReceiveMessage);
        }
    }, [hubConnect, currentNegociation]);

    return (
        <FlexBox justify="flex-start" alignItems="center" spacing={1}>
            <Paper className={classes.root}>
                {isLoading && <Loading contained={false} />}

                {negociations && negociations.length > 0 && (

                    <div className={classes.messagerContainer}>
                        <List className={classes.negociations}>
                            {negociations.map((neg) => (
                                <ListItem button key={neg.userId} onClick={() => handleItemClick(neg)} >
                                    <ListItemIcon>
                                        <PersonOutline color={neg.userId === currentNegociation ? "primary" : "secondary"} />
                                    </ListItemIcon>
                                    <ListItemText
                                        className={classes.colorsecondary}
                                        primary={neg.userName}
                                        primaryTypographyProps={{ color: "secondary", style: { fontWeight: 'bold' } }}
                                        secondary={neg.content}
                                        secondaryTypographyProps={{ color: "secondary" }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Grid
                            className={classes.messagesContainer}
                            container
                            direction="column"
                            alignItems="flex-start"
                        >
                            <Grid container item direction="column"
                                className={classes.listMessagesContainer}
                                alignItems="flex-start">

                                {messages && messages.length > 0 && messages.map((mess) => (
                                    <Paper key={mess.id} elevation={2} style={{ padding: '8px 15px', margin: '3px 1px', alignSelf: (mess.isProviderSend ? "flex-end" : "flex-start") }}>
                                        <Typography color={mess.isProviderSend ? "initial" : "secondary"}>{mess.content}</Typography>
                                    </Paper>
                                ))
                                }
                            </Grid>
                            <Grid item xs={12} className={classes.inputContainer}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    margin="none"
                                    className={classes.inputMessage}
                                />
                                <Fab
                                    variant="round"
                                    color="secondary"
                                    onClick={handleSend}
                                >
                                    <SendOutlined htmlColor="#FFF" />
                                </Fab>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </Paper>
        </FlexBox >
    );
};
export default Negociations;
