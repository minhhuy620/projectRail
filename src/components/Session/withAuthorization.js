import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROLES from '../../constants/roles'
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import { toast } from 'react-toastify';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (authUser.lock === 0) {
            if (authUser.roles === ROLES.ADMIN) {
              if (!condition(authUser)) {
                this.props.history.push('/admin-signin');
              }
            } else {
              if (!condition(authUser)) {
                this.props.history.push('/signin');
              }
            }

          } else if (authUser.lock === 1) {
            this.props.firebase.doSignOut();
            toast.error('Your account has been locked.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
            // alert("tài khoản của bạn đã bị khóa")
          }
        },
        () => {
          if (localStorage.getItem('roles') === ROLES.ADMIN) {
            this.props.history.push('/admin-signin');
          }else{
            this.props.history.push('/signin')
          }
        }

      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;
