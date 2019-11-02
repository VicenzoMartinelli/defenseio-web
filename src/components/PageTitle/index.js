import React from 'react'

import PropTypes from 'prop-types'

import { makeStyles, Breadcrumbs, Typography } from '@material-ui/core'
import { MenuOutlined } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(0.5),
    fontSize: 30
  },
  link: {
    display: 'flex'
  }
}))

const PageTitle = ({ label, ...props }) => {
  const classes = useStyles()

  return (
    <Breadcrumbs {...props}>
      <Typography variant="h5" color="textPrimary" className={classes.link}>
        <MenuOutlined className={classes.icon} />
        {label}
      </Typography>
    </Breadcrumbs>
  )
}

PageTitle.propTypes = {
  label: PropTypes.string.isRequired
}

export default PageTitle;