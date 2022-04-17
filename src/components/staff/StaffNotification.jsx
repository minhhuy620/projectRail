import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import { dbstore } from './../Firebase/firebase'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
const StaffNotification = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <StaffNotificationPage authUser={authUser} />
        )}
    </AuthUserContext.Consumer>
);

class StaffNotificationBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IdStaff: '',
            timedelay: '',
            StatusInfo: '',
            IdRoute: '',
            list: [],
            NameTrain: '',
            datetimeDelay: null,
            datetimeArrival:null
        };
    }
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        dbstore.collection('reportProblem').add({
            Date: new Date(),
            IdStaff: this.props.authUser.uid,
            NameTrain: this.state.NameTrain,
            IdRoute: this.state.IdRoute,
            TimeDelay: this.state.datetimeDelay,
            TimeArrival: this.state.timeArrival,
            StatusInfo: this.state.StatusInfo
        })
        dbstore.collection('Route').doc(this.state.IdRoute).update({
            DepartureTime: this.state.datetimeDelay,
            DestinationTime: this.state.datetimeArrival
        })
        toast.success('System will close in 3 seconds.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }
    // updateSubmit = (e) => {
    //     e.preventDefault();
    //     dbstore.collection('reportProblem').update({
    //         TimeDelay: this.state.datetimeDelay,
    //         StatusInfo: this.state.StatusInfo
    //     })
    // }
    componentDidMount() {
        const prev = [];
        dbstore.collection('Route').onSnapshot(snapshot => {
            snapshot.docChanges().forEach((change) => {
                const doc = { ...change.doc.data(), id: change.doc.id };
                prev.push(doc)
            });
            prev.map(e => {
                if (this.props.authUser.uid === e.IdStaff) {
                    this.setState({
                        IdRoute: e.IdRoute,
                        datetimeDelay: new Date(e.DepartureTime.seconds * 1000),
                        datetimeArrival: new Date(e.DestinationTime.seconds * 1000),
                        NameTrain: e.Train.NameTrain,
                    });
                }
                return prev;
            });
            this.setState({ list: prev })
        })
    }
    render() {
        return (
            <>
                <div className="card card-custom">
                    <div className="card-header">
                        <h3 className="card-title">
                            Notify Issue
                        </h3>
                    </div>
                    <form className="form" autoComplete="off" onSubmit={(e) => this.onSubmit(e)}>
                        <div className="card-body">
                            <div className="form-group form-group-last">
                                <div className="alert alert-custom alert-default" role="alert">
                                    <div className="alert-icon"><i className="flaticon-warning text-danger" /></div>
                                    <div className="alert-text">
                                        Report <code>problem</code> or <code>delay</code> when train make trouble.
                                    </div>
                                </div>
                            </div>
                            {/* {this.state.list.map(item => */}
                            <div className="form-group">
                                <label>ID Route</label>
                                <input type="text" className="form-control" placeholder="Enter IdRoute" name="IdRoute" value={this.state.IdRoute} onChange={this.isChange} disabled />
                            </div>
                            {/* )
                            } */}
                            <div className="form-group">
                                <label>ID Staff</label>
                                <input type="text" className="form-control" placeholder="Enter Id Staff" name="IdStaff" value={this.props.authUser.uid} onChange={this.isChange} disabled />
                            </div>
                            <div className="form-group">
                                <label>Train</label>
                                <input type="text" className="form-control" placeholder="Enter Name Train" name="NameTrain" value={this.state.NameTrain} onChange={this.isChange} disabled />
                            </div>
                            <div className="form-group">
                                <label>Estimated time of delay</label>
                                <div className="form-control">
                                    <DatePicker
                                        selected={this.state.datetimeDelay}
                                        onChange={date => this.setState({ datetimeDelay: date })}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Estimated time of arrival</label>
                                <div className="form-control">
                                    <DatePicker
                                        selected={this.state.datetimeArrival}
                                        onChange={date => this.setState({ datetimeArrival: date })}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Status of Train</label>
                                <input type="text" className="form-control" placeholder="Status Info" name="StatusInfo" value={this.state.StatusInfo} onChange={this.isChange} />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary mr-2">Submit</button>
                            {/* <button onClick={(e) => this.updateSubmit(e)} className="btn btn-secondary">Update</button> */}
                        </div>
                    </form>
                </div>
            </>
        );
    }
}
const StaffNotificationPage = withFirebase(StaffNotificationBase);
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(StaffNotification)