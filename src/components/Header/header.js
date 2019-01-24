import React, { Component } from 'react';
import { Link }  from 'react-router';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}


const LoggedOutView = props => {
  if(!props.currentUser) {
    return(
    <div>
      <Link to="/" className="nav-link">
        <Button color="secondary"> Home </Button>
      </Link>
      <Link to="/login" className="nav-link">
        <Button color="secondary"> Log In </Button>
      </Link>
      <Link to="/signup" className="nav-link">
        <Button color="secondary">Register</Button>
      </Link>
    </div>
    )
  }
  return null;
}

const LoggedInView = props => {
  if(props.currentUser) {
    return(
      <div>
        <Link to="/" className="nav-link">
          <Button color="secondary"> Home </Button>
        </Link>
        <Link to="/login" className="nav-link">
          <Button color="secondary"> Log In </Button>
        </Link>
        <Link to="/signup" className="nav-link">
          <Button color="secondary">Register</Button>
        </Link>
      </div>
    )
  }
  return null
}

class Header extends Component {
  render() {
    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {this.props.appName}
          </Typography>
          <LoggedOutView currentUser={this.props.currentUser} />
          <LoggedInView currentUser={this.props.currentUser} />
        </Toolbar>
      </AppBar>
    </div>
    )
  }
}

export default Header;

