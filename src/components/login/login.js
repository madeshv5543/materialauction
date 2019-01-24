import React, { Component } from "react";
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/LockOutlined"
import People from "@material-ui/icons/People";
// core components
import Header from "../customEle/Header/Header.jsx";
import HeaderLinks from "../customEle/Header/HeaderLinks.jsx";
import Footer from "../customEle/Footer/Footer.jsx";
import GridContainer from "../customEle/Grid/GridContainer.jsx";
import GridItem from "../customEle/Grid/GridItem.jsx";
import Button from "../customEle/CustomButtons/Button.jsx";
import Card from "../customEle/Card/Card.jsx";
import CardBody from "../customEle/Card/CardBody.jsx";
import CardHeader from "../customEle/Card/CardHeader.jsx";
import CardFooter from "../customEle/Card/CardFooter.jsx";
import CustomInput from "../customEle/CustomInput/CustomInput.jsx";

import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage.jsx";

import image from "../../assets/img/bg7.jpg";
import { LOGIN, LOGIN_PAGE_UNLOADED, UPDATE_FIELD_AUTH } from '../../actions/types';
import agent from "../../agent.js";

const mapStateToProps = state => ({...state.auth});

const mapDispatchToProps =dispatch => ({
  onChangeEmail: value  => 
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value}),
  onChangePassword: value  => 
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value}),
  onSubmit : (email, password) => 
    dispatch({ type: LOGIN, payload : agent.Auth.login(email, password)}),
  onUnload: () =>
    dispatch({type: LOGIN_PAGE_UNLOADED})
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submit = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password)
    }
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes, ...rest } = this.props;
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div>
        {/* <Header
          absolute
          color="transparent"
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          {...rest}
        /> */}
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form} onSubmit={this.submit(email, password)}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                      {/* <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </Button>
                      </div> */}
                    </CardHeader>
                    {/* <p className={classes.divider}>Or Be Classical</p> */}
                    <CardBody>
                      {/* <CustomInput
                        labelText="First Name..."
                        id="first"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      /> */}
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          value: this.props.email,
                          onChange: this.changeEmail,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          value: this.props.password,
                          onChange: this.changePassword,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Lock className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple type="submit" color="primary" size="lg">
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(LoginPage)) ;
