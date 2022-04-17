import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
class ListStaffComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userData: [],
            search: '',
            color: "#8950FC",
            loading: true
        }
        this.lock = this.lock.bind(this);
        this.unLock = this.unLock.bind(this);
    }
    override = css`
    display: block;
    margin: 0 auto;
    border-color: #8950FC;
    text-left align-middle
  `;
    lock(id) {
        this.props.firebase.user(id).update({
            lock: 1
        })
    }
    unLock(id) {
        this.props.firebase.user(id).update({
            lock: 0
        })
    }
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    roleStaffFood(id) {
        this.props.firebase.user(id).update({
            roles: "STAFF_FOOD"
        })
    }
    roleStaffInspector(id) {
        this.props.firebase.user(id).update({
            roles: "STAFF_INSPECTOR"
        })
    }
    handleSearch = e => {
        this.setState({ search: e.target.value });
    }
    componentDidMount() {

        this.props.firebase.users().orderByChild("roles").on('value', (users) => {
            let arrayData = [];
            users.forEach(element => {
                if (element.val().roles === "STAFF_FOOD" || element.val().roles === "STAFF_INSPECTOR") {
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
                }
            });
            this.setState({
                userData: arrayData
            })

        })
    }

    render() {
        const filtered = this.state.userData.filter((info) => info.email.toLowerCase().includes(this.state.search.toLowerCase()))
        return (
            <>

                <div className="card card-custom">
                    <div className="card-header flex-wrap py-5">
                        <div className="card-title">
                            <h3 className="card-label">List Staff
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
                                        <th className="text-center">Action</th>
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
                                                        <i className="fa fa-unlock-alt fa-2x text-primary" onClick={() => this.lock(user.id)} ></i>
                                                        :
                                                        <i className="fa fa-lock fa-2x text-danger" onClick={() => this.unLock(user.id)} ></i>
                                                    }

                                                </td>
                                                <td className="text-center align-middle">
                                                    {user.roles === 'STAFF_FOOD' ?
                                                        <span className="navi-text text-muted text-hover-primary mr-3" title="Change Role">
                                                            <i className="fas fa-edit" onClick={() => this.roleStaffInspector(user.id)}></i>
                                                        </span>
                                                        :
                                                        <span className="navi-text text-muted text-hover-primary mr-3" title="Change Role">
                                                            <i className="fas fa-edit" onClick={() => this.roleStaffFood(user.id)} title="Change Role"></i>
                                                        </span>
                                                    }

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
        // return (
        //     <div className="card card-custom">
        //         <div className="card-header flex-wrap py-5">
        //             <div className="card-title">
        //                 <h3 className="card-label">List Staff
        //                 </h3>
        //             </div>
        //         </div>
        //         <div className="card-body">
        //             <div className="mb-7">
        //                 <div className="row align-items-center">
        //                     <div className="col-lg-9 col-xl-8">
        //                         <div className="row align-items-center">
        //                             <div className="col-md-4 my-2 my-md-0">
        //                                 <div className="input-icon">
        //                                     <input type="text" className="form-control" placeholder="Search..." id="kt_datatable_search_query" />
        //                                     <span>
        //                                         <i className="flaticon2-search-1 text-muted"></i>
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <table className="table table-bordered table-hover table-checkable">
        //                 <thead>
        //                     <tr>
        //                         <th>User Name</th>
        //                         {/* <th>Last Name</th> */}
        //                         <th>Email</th>
        //                         <th>Roles</th>
        //                         {/* <th>Identity Card</th>
        //                         <th>Phone</th> */}
        //                         <th>Lock</th>
        //                         <th>Actions</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {
        //                         this.state.userData.map(
        //                             user =>
        //                                 <tr key={user.id}>
        //                                     <td> {user.name} </td>
        //                                     <td> {user.email}</td>
        //                                     <td> {user.roles}</td>
        //                                     {/* <td> {user.identityCard}</td>
        //                                     <td> {user.phone}</td> */}
        //                                     <td>
        //                                         {user.lock === 0 ?
        //                                             <i className="fa fa-unlock-alt fa-2x text-primary" onClick={() => this.lock(user.id)} ></i>
        //                                             :
        //                                             <i className="fa fa-lock fa-2x text-danger" onClick={() => this.unLock(user.id)} ></i>
        //                                         }
        //                                     </td>
        //                                     <td>
        //                                         {user.roles === 'STAFF_FOOD' ?
        //                                             <button type="button" onClick={() => this.roleStaffInspector(user.id)} className="btn btn-light-info font-weight-bold mr-2">Change Role</button>
        //                                             :
        //                                             <button type="button" onClick={() => this.roleStaffFood(user.id)} className="btn btn-light-info font-weight-bold mr-2">Change Role</button>
        //                                         }
        //                                         <Link to={`/detail-info/${user.id}`} className="btn btn-light-info font-weight-bold mr-2">Detail</Link>

        //                                     </td>
        //                                 </tr>
        //                         )
        //                     }
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>

        // )
    }
}

export default withFirebase(ListStaffComponent)