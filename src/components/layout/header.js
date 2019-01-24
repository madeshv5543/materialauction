import React, { Component } from 'react'
import Navbar from './Navbar'
import agent from '../../agent'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'

import { APP_LOAD, REDIRECT } from '../../actions/types'

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchProps = dispatch => ({
  onLoad: (payload, token) => 
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true}),
  onRedirect: () =>
    dispatch({ type: REDIRECT})
})

class Header extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    if(token)
      agent.setToken(token)
    this.props.onLoad(token ? agent.Auth.current():  null, token)
  }
  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Navbar />
        </div>
      );
    }
    return (
      <Navbar />
    )
  }
}

Header.contextType = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchProps)(Header);