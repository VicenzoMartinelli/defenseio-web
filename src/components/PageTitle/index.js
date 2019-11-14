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

const PageTitle = ({ label, iconComponent, ...props }) => {
  const classes = useStyles()
  const IcComponent = iconComponent;

  const Icon = iconComponent === undefined ? <MenuOutlined className={classes.icon} /> : <IcComponent className={classes.icon} />

  return (
    <Breadcrumbs {...props}>
      <Typography variant="h5" color="textPrimary" className={classes.link}>
        {Icon}
        {label}
      </Typography>
    </Breadcrumbs>
  )
}

PageTitle.propTypes = {
  label: PropTypes.string.isRequired
}

export default PageTitle;