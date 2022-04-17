import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';
const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      identityCard: "",
      phoneNumber: "",
      password: "",
      repeat_password: "",
      agree: false,
      formErrors: {},
      type: 'password',
      type1: 'password',
      score: 'null',
      error: null,
    };
    this.initialState = this.state;
    this.showHide = this.showHide.bind(this);
    this.showHide1 = this.showHide1.bind(this);

  }
  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'password' ? 'input' : 'password'
    });
  }
  showHide1(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type1: this.state.type1 === 'password' ? 'input' : 'password'
    });
  }

  handleFormValidation() {
    const { username, email,password, repeat_password } = this.state;
    let formErrors = {};
    let formIsValid = true;

    if (!username) {
      formIsValid = false;
      formErrors["usernameErr"] = "Username is required.";
    }
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
      formErrors["passwordErr"] = "Password is required.";
    }
    else if(password.length<6){
      formIsValid = false;
      formErrors["passwordErr"] = "Password should be more than 5 character";
    }
    if (!repeat_password) {
      formIsValid = false;
      formErrors["repeat_passwordErr"] = "R-Password is required.";
    }else if(repeat_password.length<6){
      formIsValid = false;
      formErrors["repeat_passwordErr"] = "Password should be more than 5 character";
    }else if (repeat_password !== password) {
      formIsValid = false;
      formErrors["repeat_passwordErr"] = "Passwords don't match..";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  // checkboxHandler = (e) => {
  //     this.setState({ agree: true });
  // }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.handleFormValidation()) {
      this.setState(this.initialState)
      const { username, email, identityCard, phoneNumber, password } = this.state;
      this.props.firebase.doCreateUserWithEmailAndPassword(email, password)
        .then(authUser => {
          //creating a user in the database after the sign up through Firebase auth API
          this.props.firebase.doCreateUser(authUser.user.uid, username, email, identityCard, phoneNumber, "USER", '', 0)
            .then(() => {
              toast.success('You have been successfully registered.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
              toast.success('Check your E-Mails for a confirmation E-Mail.', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
              setTimeout(() => {
                window.location.reload()
            }, 4000);
              // alert('You have been successfully registered.')
              // alert('Check your E-Mails for a confirmation E-Mail')
              this.props.history.push("/signin");
            }).then(() => {
              return this.props.firebase.doSendEmailVerification();
            })
            .catch(error => {
              if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
              }
              this.setState({ error });
            });
        })
        .catch(error => {
          if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
            error.message = ERROR_MSG_ACCOUNT_EXISTS;
          }
          this.setState({ error });
        });

    }

  }

  render() {
    const { error } = this.state;
    const { usernameErr, emailErr, passwordErr, repeat_passwordErr } = this.state.formErrors;

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
                  Register
                </span>
                {error && <p style={{ color: "red", marginTop: '-40px' }}>{error.message}</p>}
                <div className={usernameErr ? "wrap-input100 validate-input alert-validate" : "wrap-input100 validate-input"} data-validate={usernameErr}>
                  <input className='input100' type="text" name="username" placeholder="User name" value={this.state.username}
                    onChange={this.handleChange} />
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    {/* <i className="fa fa-envelope" aria-hidden="true" /> */}
                    <i className="fas fa-user" aria-hidden="true"></i>
                  </span>
                </div>
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
                <div className={repeat_passwordErr ? "wrap-input100 validate-input alert-validate" : "wrap-input100 validate-input"} data-validate={repeat_passwordErr}>
                  <input className='input100' type={this.state.type1} name="repeat_password" placeholder="Repeat Password" value={this.state.repeat_password}
                    onChange={this.handleChange} />
                  <span className="input100__show" onClick={this.showHide1}>{this.state.type1 === 'password' ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}</span>
                  <span className="focus-input100" />
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true" />
                  </span>
                </div>
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
                    Register
                  </button>
                </div>
                <div className="text-center p-t-40">
                  <Link to="/signin" className="txt2">
                    <i className="fa fa-long-arrow-left m-r-5" aria-hidden="true"></i>
                    Login Account

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
export default compose(
  withRouter,
  withFirebase,
)(Register)