import React from 'react';
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';

const DangerButton = withStyles(theme => ({
    root: {
      color: "#FFF",
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
      
    },
  }))(Button);

export default DangerButton;