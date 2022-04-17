import React, { Component } from 'react'
import { Link } from 'react-router-dom';
class OptionPage extends Component {

  foward() {
    this.props.history.push("/mapticket");
  }
  newTicket() {
    localStorage.removeItem('IdGuest');
    localStorage.removeItem('DestinationTime')
    window.location.reload()
  }
  render() {

    return (
      <div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-pic">
                <img className="mb-30" src="./assets/css/Logo-Railcare/11railcare.png" alt="IMG" />
              </div>
              <form className="login100-form mb-60 validate-form">
                <div className="back">
                  <Link to="/">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
                <span className="login100-form-title">
                  Option
                </span>
                <div className="container-login100-form-btn">
                  <Link to="/signin" className="login100-form-btn" style={{ "color": "white" }}>
                    Login
                  </Link>
                </div>
                <div className="container-login100-form-btn">
                  <Link to="/enterticket" className="login100-form-btn" style={{ "color": "white" }}>
                    View Location
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OptionPage