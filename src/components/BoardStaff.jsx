import React, { Component } from "react";

import { AuthUserContext,withAuthorization } from './Session';
import { compose } from 'recompose';

class BoardStaff extends Component {

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    <div>
                        <h3>{authUser.roles}</h3>
                    </div>
                }
            </AuthUserContext.Consumer>
        );
    }
}
const condition = authUser => !!authUser;
export default compose(withAuthorization(condition))(BoardStaff)