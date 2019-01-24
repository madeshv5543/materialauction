import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    const errors = this.props.errors;
    if(errors) {
      return (
        <div className="alert alert-danger">
          <p>{errors}</p>
        </div>
      )
    }else{
      return null
    }
  }
}

export default ErrorPage;