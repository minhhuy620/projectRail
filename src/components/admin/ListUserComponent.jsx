import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userData: [],
            search: '',
            color: "#8950FC",
            loading: true
        }
        this.lockUser = this.lockUser.bind(this);
        this.unlockUser = this.unlockUser.bind(this);
    }
    lockUser(id) {
        this.props.firebase.user(id).update({
            lock: 1
        })
    }
    unlockUser(id) {
        this.props.firebase.user(id).update({
            lock: 0
        })
    }
    override = css`
    display: block;
    margin: 0 auto;
    border-color: #8950FC;
    text-left align-middle
  `;
    componentDidMount() {
        this.props.firebase.users().orderByChild("roles").equalTo("USER").on('value', (users) => {
            var arrayData = [];
            users.forEach(element => {
                const key = element.key;
                const name = element.val().username;
                const email = element.val().email;
                const roles = element.val().roles;
                const lock = element.val().lock;
                arrayData.push({
                    id: key,
                    name: name,
                    email: email,
                    roles: roles,
                    lock: lock
                })
            });
            this.setState({
                userData: arrayData
            })
        })
    }
    handleSearch = e => {
        this.setState({ search: e.target.value });
    }
    render() {
        const filtered = this.state.userData.filter((info) => info.email.toLowerCase().includes(this.state.search.toLowerCase()))
        return (
            <>
                <div className="card card-custom">
                    <div className="card-header flex-wrap py-5">
                        <div className="card-title">
                            <h3 className="card-label">List Users
                            </h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="mb-7">
                            <div className="row align-items-center">
                                <div className="col-lg-9 col-xl-8">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 my-2 my-md-0">
                                            <div className="input-icon">
                                                <input type="text" className="form-control" placeholder="Search..." value={this.state.search} onChange={this.handleSearch} />
                                                <span>
                                                    <i className="flaticon2-search-1 text-muted"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th className="text-center">User Name</th>
                                        <th className="text-center">Roles</th>
                                        <th className="text-center">Lock</th>
                                        <th className="text-center">Info</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filtered.length === 0 &&
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <PropagateLoader color={this.state.color} loading={this.state.loading} css={this.override} size={15} />
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    }
                                    {filtered.map(
                                        user => (
                                            <tr key={user.id}>
                                                <td className="text-left align-middle">
                                                    {user.email}
                                                </td>
                                                <td className="text-center align-middle">
                                                    {user.name}
                                                </td>
                                                <td className="text-center align-middle">
                                                    {user.roles}

                                                </td>
                                                <td className="text-center align-middle">
                                                    {user.lock === 0 ?
                                                        <i className="fa fa-unlock-alt fa-2x text-primary" onClick={() => this.lockUser(user.id)} ></i>
                                                        :
                                                        <i className="fa fa-lock fa-2x text-danger" onClick={() => this.unlockUser(user.id)} ></i>
                                                    }

                                                </td>
                                                <td className="text-center align-middle">
                                                    <Link to={`/detail-info/${user.id}`} className="navi-text text-muted text-hover-primary" title="Detail Info">
                                                        <i className="fas fa-info-circle" />
                                                    </Link>
                                                </td>

                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withFirebase(ListUserComponent)