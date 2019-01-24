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
import ErrorPage from '../common/Error';

import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage.jsx";

import image from "../../assets/img/bg7.jpg";
import agent from '../../agent';

import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
  GO_TO_HOME
} from '../../actions/types'

const mapstateToProps = state => ({...state})

const mapDispatchToProps = dispatch => ({
  onChangePassword: value =>
    dispatch({type: UPDATE_FIELD_AUTH, key: 'password', value}),
  onChangeUsername: value =>
    dispatch({type: UPDATE_FIELD_AUTH, key: 'username', value}),
  onChangeConfirmPassword: value => 
    dispatch({type: UPDATE_FIELD_AUTH, key:'confirmPassword', value}),
  onChangeEmail: value => 
    dispatch({type: UPDATE_FIELD_AUTH, key:'email', value}),
  onSubmit: (username, email, password, confirmPassword) => {
    const payload = agent.Auth.register(username, email, password, confirmPassword);
    console.log("payload ", payload)
    dispatch({type: REGISTER, payload})
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED }),
  _downloadTxtFile : (value) => {
      console.log('download', value)
      var element = window.document.createElement("a");
      var file = new Blob([value], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "seed.txt";
      element.click();
  },
  redirectTohome : () => {
    dispatch({type: GO_TO_HOME, payload:'\home'})
  }
})

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    // this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)
    this.changeConfirmPassword = ev => this.props.onChangeConfirmPassword(ev.target.value) 
    this.submitForm  = (username, email, password, confirmPassword) => ev => {
      console.log("form submitted", username)
      ev.preventDefault()
      this.props.onSubmit(username, email, password, confirmPassword)
    }
    this.download = value  => ev => {
      this.props._downloadTxtFile(value);
    }
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden"
    };
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

  componentWillUnmount() {
    this.props.onUnload()
  }
  render() {
    const { classes, ...rest } = this.props;
    const user = this.props.auth;
    const email = user.email;
    const password = user.password;
    const confirmPassword = user.confirmPassword;
    const username = user.username;
    const seed = user.data ? user.data.seed : null;
    console.log("user", this.props)
    const stepOne = (
        <form onSubmit={this.submitForm(username, email, password, confirmPassword)}>
          <CardHeader color="primary" className={classes.cardHeader}>
            <h4>Register</h4>
          </CardHeader>
          <CardBody>
            <ErrorPage errors = {this.props.auth.errors} />
            <CustomInput
              labelText="Username..."
              id="username"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "text",
                value : this.props.username,
                onChange: this.changeUsername,
                endAdornment: (
                  <InputAdornment position="end">
                    <People className={classes.inputIconsColor} />
                  </InputAdornment>
                )
              }}
            />
            <CustomInput
              labelText="Email..."
              id="email"
              formControlProps={{
                fullWidth: true,
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
            <CustomInput
              labelText="Repeat Password"
              id="confirmpassword"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "password",
                value : this.props.confirmPassword,
                onChange: this.changeConfirmPassword,
                endAdornment: (
                  <InputAdornment position="end">
                    <Lock className={classes.inputIconsColor} />
                  </InputAdornment>
                )
              }}
            />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
            <Button simple  type="submit" color="primary" size="lg">
              Get started
            </Button>
          </CardFooter>
        </form>
    )
    const steptwo = (
      <div>
        <CardHeader color="primary" className={classes.cardHeader}>
            <h4>Save Seed</h4>
          </CardHeader>
          <CardBody>
            <div>
              <p>{seed}</p>
            </div>
            <br />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
            <Button simple  onClick={this.download(seed)} color="primary" size="lg">
              Save seed
            </Button>
            <Button simple   color="primary" size="lg">
              I Saved Continue
            </Button>
          </CardFooter>
      </div>
    )

  let content = user.data ? steptwo : stepOne;
    return (
      <div>
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
                { content }
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


export default connect(mapstateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(SignUpPage))
