import React, { Component } from "react";
import { TrainTicketContext } from "../../../global/TrainTicketContext";
import { dbstore } from "../../Firebase/firebase"
import { compose } from "recompose";
import { withFirebase } from '../../Firebase';
import { AuthUserContext, withAuthorization } from '../../Session';
import { toast } from "react-toastify";
const TicketCode = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <TicketCodePage authUser={authUser} />
        )}
    </AuthUserContext.Consumer>
);
class TicketCodeBase extends Component {
    static contextType = TrainTicketContext
    constructor(props) {
        super(props);

        this.state = {
            IdTicket: '',
        };
    }
    componentDidUpdate() {
        const { train_ticket } = this.context;
        const checkTicket = train_ticket.find((x) => x.IdTicket === localStorage.getItem("IdTicket"));
        dbstore.collection("CustomerVoucher")
          .where("IdVoucher", "==", "VCRCS_02")
          .where("uid", "==", this.props.authUser.uid)
          .onSnapshot((res) => {
            if (res.size === 0) {
              dbstore.collection("Ticket")
                .where("uid", "==", this.props.authUser.uid)
                .onSnapshot((res) => {
                  if (res.size === 3) {
                    dbstore.collection("Voucher")
                      .doc("VCRCS_02")
                      .get()
                      .then((doc) => {
                        dbstore.collection("CustomerVoucher")
                          .add({
                            Discount: Number(doc.data().Discount),
                            IdVoucher: doc.id,
                            TimeExpired: doc.data().TimeExpired,
                            uid: this.props.authUser.uid,
                            isUsed: false,
                          })
                          .then(() => {
                            toast.success('You have one voucher.', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: false,
                                progress: undefined,
                            });
                            toast.success('Please check Voucher Ticket.', {
                                position: "top-right",
                                autoClose: 3500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: false,
                                progress: undefined,
                            });
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                      });
                  }
                });
            }
          });
        if (!!checkTicket === true) {
            if (checkTicket.checked === true) {
                localStorage.setItem('checked', checkTicket.checked)
            }
            if (checkTicket.Schedule.Route.DepartureTime.seconds * 1000 !== JSON.parse(localStorage.getItem("DepartureTime"))) {
                localStorage.removeItem('distance');
                localStorage.setItem('DepartureTime', checkTicket.Schedule.Route.DepartureTime.seconds * 1000);
                window.location.reload()
            }
            dbstore.collection('Route').doc(checkTicket.Schedule.Route.IdRoute).get().then((doc) => {
                if (doc.data().DestinationTime.seconds * 1000 !== JSON.parse(localStorage.getItem("DestinationTime"))) {
                    localStorage.setItem('DestinationTime', doc.data().DestinationTime.seconds * 1000);
                }
            })

        }

    }
    componentDidMount() {
        var DestinationTime = JSON.parse(localStorage.getItem("DestinationTime"));
        var currentTime = new Date().getTime();

        if (!!localStorage.getItem('TicketID') === true && DestinationTime !== null && (currentTime >= DestinationTime)) {

            dbstore.collection('Ticket').doc(localStorage.getItem("TicketID")).update({
                status: true
            }).then(() => {
                localStorage.removeItem('checked')
                localStorage.removeItem('TicketID')
                localStorage.removeItem('DestinationTime')
                localStorage.removeItem('DepartureTime')
                localStorage.removeItem('IdTicket')
                localStorage.removeItem('status')
                localStorage.removeItem('listTicket')
                return window.location.reload()
            })
        }
    }

    ticketSubmit = (e) => {
        e.preventDefault();
        const { train_ticket } = this.context;
        const checkTicket = train_ticket.find((x) => x.IdTicket === this.state.IdTicket);
        if (!!checkTicket === true) {
            if (checkTicket.status === false) {
                if (checkTicket.uid === '' || checkTicket.uid === null || checkTicket.uid === this.props.authUser.uid) {
                    dbstore.collection('Ticket').doc(checkTicket.id).update({
                        uid: this.props.authUser.uid
                    })
                    dbstore.collection('Route').doc(checkTicket.Schedule.Route.IdRoute).get().then((doc) => {
                        if (doc.exists) {
                            localStorage.setItem('DestinationTime', doc.data().DestinationTime.seconds * 1000);
                        } else {
                            console.log("No such document!");
                        }
                    })
                    localStorage.setItem('DepartureTime', checkTicket.Schedule.Route.DepartureTime.seconds * 1000)
                    localStorage.setItem('IdTicket', this.state.IdTicket);
                    localStorage.setItem('IdTrain', checkTicket.Schedule.Route.Train.IdTrain);
                    localStorage.setItem('TicketID', checkTicket.id);
                    localStorage.setItem('checked', checkTicket.checked)
                    localStorage.setItem('status', checkTicket.status)
                    localStorage.setItem('listTicket', JSON.stringify(checkTicket))
                    toast.success('Please wait in 3 seconds.', {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 2500);
                } else if (checkTicket.uid !== this.props.authUser.uid) {
                    toast.error('Ticket is being used.', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                }
            } else {
                toast.error('Ticket to out of date.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            }
        } else {
            toast.error('Ticket code do not exist.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
    }
    foward() {
        this.props.history.push("/ve-tau-current");
    }
    newTicket() {
        localStorage.removeItem('IdTicket');
        localStorage.removeItem('TicketID');
        localStorage.removeItem('checked')
        localStorage.removeItem('DestinationTime')
        localStorage.removeItem('status')
        localStorage.removeItem('listTicket')
        localStorage.removeItem('IdTrain2')
        localStorage.removeItem('IdTrain')
        window.location.reload()
    }
    render() {
        return (
            <>
                {localStorage.getItem('IdTicket') === null &&
                    <div className="row mx-auto">
                        <div className="col-lg-9 col-xl-9 col-sm-9">
                            <div className="input-group input-group-lg input-group-solid">
                                <input className="form-control form-control-lg form-control-solid" type="text" placeholder="Enter ticket code" name="username" value={this.state.IdTicket} onChange={(e) => this.setState({ IdTicket: e.currentTarget.value })} />
                            </div>
                        </div>
                        <button className="col-xl-3 col-lg-3 col-sm-3 btn btn-success" onClick={this.ticketSubmit}>Check</button>
                    </div>
                }
                {localStorage.getItem('IdTicket') !== null &&
                    <div className="col-md-12 text-center">
                        <button className="col-xl-6 btn btn-success" onClick={this.newTicket}>Enter a new ticket</button>
                    </div>
                }
            </>
        )
    }
}
const TicketCodePage = withFirebase(TicketCodeBase);
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(TicketCode)