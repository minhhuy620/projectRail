import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';
import { TrainTicketContext } from '../global/TrainTicketContext';
import { dbstore } from "./Firebase/firebase"
import { toast } from 'react-toastify';
class EnterTicket extends Component {
  static contextType = TrainTicketContext
  constructor(props) {
    super(props);

    this.state = {
      IdGuest: '',
      error: null,
      score: 'null',
    };
  }


  ticketSubmit = (e) => {
    e.preventDefault();
    const { train_ticket } = this.context;
    const checkTicket = train_ticket.find((x) => x.IdGuest === this.state.IdGuest);
    if (!!checkTicket === true) {
      if (checkTicket.status === false) {
        dbstore.collection('Route').doc(checkTicket.Schedule.Route.IdRoute).get().then((doc) => {
          if (doc.exists) {
            localStorage.setItem('DestinationTime', doc.data().DestinationTime.seconds * 1000);
          } else {
            console.log("No such document!");
          }
        })
        localStorage.setItem('IdGuest', this.state.IdGuest);
        localStorage.setItem('TicketID', checkTicket.id);
        localStorage.setItem('IdTrain2', checkTicket.Schedule.Route.Train.IdTrain);
        toast.success('Please wait in 3 seconds.', {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        
        this.props.history.push('/mapticket')
        window.location.reload()
      } else {
        toast.error('Ticket is out of date.', {
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
    this.props.history.push("/mapticket");
  }
  newTicket() {
    localStorage.removeItem('IdGuest');
    localStorage.removeItem('DestinationTime')
    window.location.reload()
  }
  render() {
    return (
      <div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-pic">
                <img src="./assets/css/Logo-Railcare/11railcare.png" alt="IMG" />
              </div>
              <form className="login100-form validate-form">
                <div className="back">
                  <Link to="/options">
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </div>
                <span className="login100-form-title">
                  View Location
                </span>
                {localStorage.getItem('IdGuest') === null &&
                  <>
                    <div className="wrap-input100 validate-input">
                      <input className='input100' type="text" name="IdGuest" placeholder="Guest code..." value={this.state.IdGuest}
                        onChange={(e) => this.setState({ IdGuest: e.currentTarget.value })} />
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
                  </>
                }
                {localStorage.getItem('IdGuest') !== null &&
                  <>
                    <div className="container-login100-form-btn">
                      <button className="login100-form-btn" onClick={this.foward.bind(this)}>
                        Check
                      </button>
                    </div>
                    <div className="text-center p-t-40 p-b-175">
                      <button className="txt2" onClick={this.newTicket}>
                        <i className="fa fa-long-arrow-left m-r-5" aria-hidden="true"></i>
                        Enter a new ticket

                      </button>
                    </div>
                  </>
                }
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
)(EnterTicket)