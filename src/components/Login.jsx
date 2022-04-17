import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../components/Firebase';
import { TrainTicketContext } from '../global/TrainTicketContext';
import * as ROLES from '../constants/roles';
import { toast } from 'react-toastify';
const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;
class Login extends Component {
  static contextType = TrainTicketContext
  constructor(props) {
    super(props);

    this.state = {
      error: null,
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
    }else if(password.length<6){
      formIsValid = false;
      formErrors["passwordErr"] = "Password should be more than 5 character.";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  needsEmailVerification = authUser =>
    authUser &&
    !authUser.user.emailVerified &&
    authUser.user.providerData.map(provider => provider.providerId).includes('password');
  handleSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    if (this.handleFormValidation()) {
      this.setState(this.initialState)
      this.props.firebase.doSignInWithEmailAndPassword(email, password)
        .then((localAuthUser) => {
          if (this.needsEmailVerification(localAuthUser)) {
            toast.success('Check your E-Mails for a confirmation E-Mail.', {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
            
            // alert('Check your E-Mails for a confirmation E-Mail')
            localStorage.setItem("verifyEmail", this.needsEmailVerification(localAuthUser))
          } else {
            const currentUser = this.state.listId.find(x => x.id === localAuthUser.user.uid);
            if (!!currentUser === true) {
              localStorage.setItem("lock", currentUser.lock)
              localStorage.setItem("roles", currentUser.roles)
              return;
            }
          }
        })
        .then(() => {
          this.setState({ error: null });
          var role = localStorage.getItem("roles");
          var lock = localStorage.getItem("lock");
          var verifyEmail = JSON.parse(localStorage.getItem("verifyEmail"));
          if (!verifyEmail) {
            if (lock === '0' || lock === null) {
              if (role === ROLES.USER) {
                window.history.pushState(null, '', "/homepage-user");
                window.location.reload()
              } else if (role === ROLES.ADMIN) {
                window.history.pushState(null, '', "/homepage_admin");
                window.location.reload()
              } else if (role === ROLES.STAFF_FOOD) {
                window.history.pushState(null, '', "/confirm-order");
                window.location.reload()
              } else if (role === ROLES.STAFF_INSPECTOR) {
                window.history.pushState(null, '', "/check-ticket");
                window.location.reload()
              } else {
                window.history.pushState(null, '', "/homepage-user");
                window.location.reload()
              }
            } else if (lock === '1') {
              toast.error('Your account has been locked.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              });
              // alert('tài khoản của bạn đã bị khóa')
            }
          } else {
            setTimeout(() => {
              window.location.reload()
          }, 4000);
          }
        }).then(() => {
          window.localStorage.removeItem("roles");
          window.localStorage.removeItem("lock");
          window.localStorage.removeItem("verifyEmail");

        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }
  componentDidMount() {
    const userRef = this.props.firebase.db.ref('users');
    // const rememberMe = localStorage.getItem('rememberMe') === 'true';
    // const email = rememberMe ? localStorage.getItem('email') : '';
    // const password = rememberMe ? localStorage.getItem('password') : '';
    // this.setState({ email, password, rememberMe });
    userRef.on('value', (snapshot) => {
      let newUserState = [];
      snapshot.forEach(data => {
        var lock = snapshot.child(`${data.key}/lock`).val();
        var roles = snapshot.child(`${data.key}/roles`).val();
        newUserState.push({
          id: data.key,
          lock: lock,
          roles: roles
        })
      })
      this.setState({
        listId: newUserState
      })
    })
  }
  facebookLogin = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        const currentUser = this.state.listId.find(x => x.id === socialAuthUser.user.uid);
        if (!!currentUser === true) {
          localStorage.setItem("lock", currentUser.lock)
          localStorage.setItem("roles", currentUser.roles)
          return;
        }
        else if ((!!currentUser === false)) {
          return this.props.firebase.user(socialAuthUser.user.uid).set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: "USER",
            lock: 0,
            photoURL: socialAuthUser.additionalUserInfo.photoURL,
            phoneNumber: '',
            identityCard: ''
          });
        }
      }).then(() => {
        this.setState({ error: null });
        var role = localStorage.getItem("roles");
        var lock = localStorage.getItem("lock");
        if (lock === '0' || lock === null) {
          if (role === ROLES.USER) {
            window.history.pushState(null, '', "/homepage-user");
            window.location.reload()
          } else if (role === ROLES.ADMIN) {
            window.history.pushState(null, '', "/homepage_admin");
            window.location.reload()
          } else if (role === ROLES.STAFF_FOOD) {
            window.history.pushState(null, '', "/confirm-order");
            window.location.reload()
          } else if (role === ROLES.STAFF_INSPECTOR) {
            window.history.pushState(null, '', "/check-ticket");
            window.location.reload()
          }
          else {
            window.history.pushState(null, '', "/homepage-user");
            window.location.reload()
          }
        } else if (lock === '1') {
          toast.error('Your account has been locked.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          // alert('tài khoản của bạn đã bị khóa')
        }
      }).then(() => {
        window.localStorage.removeItem("roles");
        window.localStorage.removeItem("lock");

      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  googleLogin = event => {
    this.props.firebase.doSignInWithGoogle()
      .then(socialAuthUser => {
        const currentUser = this.state.listId.find(x => x.id === socialAuthUser.user.uid);
        if (!!currentUser === true) {
          localStorage.setItem("lock", currentUser.lock)
          localStorage.setItem("roles", currentUser.roles)
          return;
        }
        else if ((!!currentUser === false)) {
          return this.props.firebase.user(socialAuthUser.user.uid).set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: "USER",
            lock: 0,
            photoURL: socialAuthUser.user.photoURL,
            phoneNumber: '',
            identityCard: ''
          });
        }
      }).then(() => {
        this.setState({ error: null });
        var role = localStorage.getItem("roles");
        var lock = localStorage.getItem("lock");
        if (lock === '0' || lock === null) {
          if (role === ROLES.USER) {
            window.history.pushState(null, '', "/homepage-user");
            window.location.reload()
          } else if (role === ROLES.ADMIN) {
            window.history.pushState(null, '', "/homepage_admin");
            window.location.reload()
          } else if (role === ROLES.STAFF_FOOD) {
            window.history.pushState(null, '', "/confirm-order");
            window.location.reload()
          } else if (role === ROLES.STAFF_INSPECTOR) {
            window.history.pushState(null, '', "/check-ticket");
            window.location.reload()
          }
          else {
            window.history.pushState(null, '', "/homepage-user");
            window.location.reload()
          }
        } else if (lock === '1') {
          toast.error('Your account has been locked.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          // alert('tài khoản của bạn đã bị khóa')
        }
      }).then(() => {
        window.localStorage.removeItem("roles");
        window.localStorage.removeItem("lock");

      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;
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
                <div className="back">
                  <Link to="/options">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
                <span className="login100-form-title">
                  Login
                </span>
                {error && <p style={{ color: "red", marginTop: '-40px' }}>{error.message}</p>}
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
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn">
                    Login
                  </button>
                </div>
                <div className="text-center p-t-12">
                  <span className='txt1'>Forgot</span>
                  <Link to="/pw-forget" className="txt2"> Password?</Link>
                </div>
                <div className="text-center p-t-10 p-b-20" style={{ "width": "100%" }}>
                  <span className="txt2">or sign up using</span>
                </div>
                <div className="login100-form-social flex-c-m" style={{ "width": "100%" }}>
                  <div>
                    <button type="button" className="login100-form-social-item flex-c-m bg1 m-r-5" onClick={this.facebookLogin}>
                      <i className="fa fa-facebook-f" aria-hidden="true" style={{ "color": "white" }} >
                      </i>
                    </button>
                  </div>
                  <div>
                    <button type="button" className="login100-form-social-item flex-c-m bg2 m-r-5" onClick={this.googleLogin}>
                      <i className="fa fa-google" aria-hidden="true" style={{ "color": "white" }} ></i>
                    </button>
                  </div>
                </div>
                <div className="text-center p-t-40">
                  <Link to="/register" className="txt2">
                    Create your Account
                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
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
)(Login)