import React, { Component } from "react";
import { toast } from "react-toastify";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { dbstore } from "../Firebase/firebase";
import { AuthUserContext, withAuthorization } from "../Session";
const CheckTicket = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <CheckTicketPage authUser={authUser} />
    )}
  </AuthUserContext.Consumer>
);
class CheckTicketBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      IdTicket: '',
      isLoading: true,
      data: [],
    };
  }
  ticketSubmit = (e) => {
    e.preventDefault();
    dbstore.collection("Ticket")
      .where("IdTicket", "==", this.state.IdTicket)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const idSchedule = doc.data().Schedule.IdSchedule;
            const status = doc.data().status;
            console.log(idSchedule + " " + status)
            if (idSchedule !== null && status === false) {
              dbstore.collection("Schedule")
                .doc(idSchedule)
                .get()
                .then((snapshot) => {
                  const idStaff = snapshot.data().IdStaff;
                  console.log(doc.id)
                  if (idStaff === this.props.authUser.uid) {
                    dbstore.collection('Ticket').doc(doc.id).update({
                      checked: true
                    })
                    this.setState({
                      isLoading: false,
                      data: doc.data(),
                    });
                    toast.success('Check complete', {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: false,
                      progress: undefined,
                    });
                  }
                })
                .catch((res) => {
                  toast.error('Can not check ticket to complete', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                  });
                  this.setState({ isLoading: true });
                });
            } else {
              toast.error('Can not check ticket to complete', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
              })
            }
          })
        } else {
          toast.error('This ticket have expired or wrong', {
            position: "top-right",
            autoClose: 2200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          })
        }
      })
  };
  render() {
    return (
      <>
      <div className="card card-custom gutter-b card-stretch">
        <form className="login100-form validate-form m-auto pt-20">
          <span className="login100-form-title">
            Check Ticket
          </span>
          <div className="wrap-input100 validate-input">
            <input className='input100' type="text" name="IdTicket" placeholder="Ticket code..." value={this.state.IdGuest}
              onChange={(e) => this.setState({ IdTicket: e.currentTarget.value })} />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fa fa-ticket" aria-hidden="true"></i>
            </span>
          </div>

          <div className="container-login100-form-btn p-b-175">
            <button className="login100-form-btn" onClick={this.ticketSubmit}>
              Check
            </button>
          </div>
        </form>
        {/* // if (state.isLoading) return <div>Chưa có dữ liệu</div>; //TRạng thái loading , spinner */}
        {/* <div>{this.state.data.IdStaff}</div>  */}
        </div>
      </>
    )
  }
}
const CheckTicketPage = withFirebase(CheckTicketBase);
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(CheckTicket)
