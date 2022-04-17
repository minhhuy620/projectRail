import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { withFirebase } from '../components/Firebase';
class LoginAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {

      email: "",
      password: "",
      formErrors: {},
      type: 'password',
      score: 'null'
    };
    this.showHide = this.showHide.bind(this);
  }
  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'password' ? 'input' : 'password'
    });
  }

  handleFormValidation() {
    const { email, password } = this.state;
    let formErrors = {};
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      formErrors["emailErr"] = "Email id is required.";
    }
    else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email))) {
      formIsValid = false;
      formErrors["emailErr"] = "Email not match format.";
    }

    if (!password) {
      formIsValid = false;
      formErrors["passwordErr"] = "password is required.";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    if (this.handleFormValidation()) {
      this.setState(this.initialState)
      this.props.firebase.doSignInWithEmailAndPassword(email, password)
        .then(() => {
          window.history.pushState(null, '', "/homepage_admin");
          window.location.reload();
        })
        .catch(error => {
          toast.error('Email or password was wrong.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          // alert("Email or password was wrong")
        });
    }
  }
  render() {
    const { emailErr, passwordErr } = this.state.formErrors;
    return (
      <div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-pic">
                <img className="m-t-40" src="./assets/css/Logo-Railcare/11railcare.png" alt="IMG" />
              </div>
              <form className="login100-form validate-form" onSubmit={this.handleSubmit}>
                <span className="login100-form-title">
                  Login
                </span>
                <div className={emailErr ? "wrap-input100 validate-input alert-validate" : "wrap-input100 validate-input"} data-validate={emailErr}>
                  <input className='input100' type="text" name="email" placeholder="Email" value={this.state.email}
                    onChange={this.handleChange} />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true" />
                  </span>
                </div>
                <div className={passwordErr ? "wrap-input100 validate-input alert-validate" : "wrap-input100 validate-input"} data-validate={passwordErr}>
                  <input className='input100' type={this.state.type} name="password" placeholder="Password" value={this.state.password}
                    onChange={this.handleChange} />
                  <span className="input100__show" onClick={this.showHide}>{this.state.type === 'password' ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}</span>
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true" />
                  </span>
                </div>
                <div className="container-login100-form-btn p-t-40 p-b-175">
                  <button className="login100-form-btn">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  withRouter,
  withFirebase,
)(LoginAdmin)