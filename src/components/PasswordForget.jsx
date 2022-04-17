import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';
// import GoogleLogin from 'react-google-login';
class PasswordForget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            formErrors: {}
        };
    }
    handleFormValidation() {
        const { email } = this.state;
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
        this.setState({ formErrors: formErrors });
        return formIsValid;
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (e) => {
        const { email } = this.state;

        e.preventDefault();
        if (this.handleFormValidation()) {
            this.setState(this.initialState)
            this.props.firebase.doPasswordReset(email)
                .then(() => {
                    toast.warning('Please check your email to reset password.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                      });
                    // alert("Please check your email to reset password")
                    this.props.history.push("/signin");
                }).catch(error => {
                    toast.warning('Your email is not registered on the system.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                      });
                    // alert("Your email is not registered on the system")
                });

        }
    }

    render() {
        const { emailErr } = this.state.formErrors;
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-pic js-tilt" data-tilt>
                                <img src="./assets/css/Logo-Railcare/11railcare.png" alt="IMG" />
                            </div>
                            <form className="login100-form validate-form" onSubmit={this.handleSubmit}>
                                <span className="login100-form-title">
                                    Forget Password
                                </span>
                                <div className={emailErr ? "wrap-input100 validate-input alert-validate" : "wrap-input100 validate-input"} data-validate={emailErr}>
                                    <input className='input100' type="text" name="email" placeholder="Email" value={this.state.email}
                                        onChange={this.handleChange} />
                                    <span className="focus-input100" />
                                    <span className="symbol-input100">
                                        <i className="fa fa-envelope" aria-hidden="true" />
                                    </span>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Reset Password
                                    </button>
                                </div>
                                <div className="text-center p-t-40 p-b-95">
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
)(PasswordForget)