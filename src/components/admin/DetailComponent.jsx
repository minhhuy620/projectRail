import React, { Component } from 'react'
import { compose } from "recompose";
import { withAuthorization } from '../Session';
class DetailComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            identityCard: '',
            phoneNumber: '',
            photoURL: '',
            roles: ''
        }
    }

    componentDidMount() {
        this.props.firebase.user(this.props.match.params.id).once('value').then(res => {
            this.setState({
                username: res.val().username,
                phoneNumber: res.val().phoneNumber,
                email: res.val().email,
                identityCard: res.val().identityCard,
                photoURL: res.val().photoURL,
                roles: res.val().roles
            })
        })
    }
    back() {
        if (this.state.roles === "USER") {
            this.props.history.push('/user');
        } else {
            this.props.history.push('/staff')
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <div className="card-header">
                        {this.state.roles === "USER" && <h3 className="text-center">View User Details</h3>}
                        {this.state.roles === "STAFF_FOOD" && <h3 className="text-center">View Staff Food Details</h3>}
                        {this.state.roles === "STAFF_INSPECTOR" && <h3 className="text-center">View Staff Inspector Details</h3>}
                    </div>
                    <ul className="list-group list-group-flush">
                        {/* <li><img src={this.state.photoURL} alt="" sizes=""/></li> */}
                        <li className="list-group-item">Full Name: {this.state.username}</li>
                        <li className="list-group-item">Email: {this.state.email}</li>
                        <li className="list-group-item">Identity Card: {this.state.identityCard}</li>
                        <li className="list-group-item">Phone: {this.state.phoneNumber}</li>
                        <li className="list-group-item">Role: {this.state.roles}</li>
                    </ul>
                    <button onClick={this.back.bind(this)} className="btn btn-secondary">Back</button>
                </div>


            </div>
        )
    }
}
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(DetailComponent)