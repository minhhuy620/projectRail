import React, { Component } from 'react';
import { CountDownTime } from './CountDownTime/CountDownTime';
import TicketCode from './Ticket/TicketCode';

class CountDownContainer extends Component {


  render() {
    return (

      <div className="row">
        {localStorage.getItem('IdTicket') === null ?
          <>
            <div className="col-xl-12" style={{ "height": "auto", "width": "670px", "margin": "auto" }}>
              <div className="alert alert-custom alert-white alert-shadow fade show gutter-b mx-auto" role="alert">
                <TicketCode />
              </div>
              <div className="card card-custom gutter-b card-stretch">
                <img src="./assets/images/waiting.png" alt="IMG" style={{ "background-repeat": "no-repeat", "background-size": "100% 100%" }}></img>
              </div>
            </div>
          </>
          :
            <CountDownTime />
        }
      </div>
    );
  }
}

export default CountDownContainer;