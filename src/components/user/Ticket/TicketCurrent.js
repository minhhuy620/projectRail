import React from 'react';
import TicketCode from './TicketCode';
class TicketCurrent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: JSON.parse(localStorage.getItem('listTicket')),
        }
    }

    render() {
        return (
            <>
                <div className="row">
                    {localStorage.getItem('listTicket') === null ?
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
                        <div className="col-xl-3 col-sm-6 col-md-4 col-xs-12 mx-auto">
                            <article className="card card-big mb15">
                                <div className="card__img-wrap">
                                    <img className="imgticket" src="./assets/css/Logo-Railcare/3railcare.png" alt='' style={{ 'width': '100%' }} />
                                    <div>
                                        <span className="title title-overlay-left">{this.state.list.IdTicket}</span>
                                        <span className="title title-overlay-left-2">Tàu: {this.state.list.Schedule.Route.Train.NameTrain}</span>
                                    </div>
                                </div>
                                <div className="card__info">
                                    <div className="title-left-wrap"> <h5>{this.state.list.Schedule.Route.Station.Departure.NameStation}</h5> <small> ga đi </small></div>
                                    <span className="icon-wrap"><i className="fas fa-arrow-right"></i> <i className="fas fa-train"></i></span>
                                    <div className="title-right-wrap"> <h5>{this.state.list.Schedule.Route.Station.Destination.NameStation}</h5> <small>ga đến </small></div>
                                </div>
                                <div className="card__pricelist">
                                    <div className="cost">
                                        <div className="left-wrap"><var>{new Date(this.state.list.Schedule.Route.DepartureTime.seconds * 1000).toLocaleString()}</var></div>
                                        <div className="icon-wrap"> <i className="material-icons"></i></div>
                                        <div className="right-wrap"><var>{new Date(this.state.list.Schedule.Route.DestinationTime.seconds * 1000).toLocaleString()}</var></div>
                                    </div>
                                    <div className="cost">
                                        <div className="left-info"><span>{this.state.list.Schedule.Coach.NameCoach}</span></div>
                                        {/* <div className="icon-wrap"> <i className="material-icons"></i></div> */}
                                        <div className="right-info"><span>Chỗ {this.state.list.Seat.NumberSeat}</span></div>
                                        <div className="left-info"><span>{this.state.list.Schedule.Coach.TypeCoach}</span></div>

                                    </div>
                                    <div className="card__info">
                                        <div className="title-wrap"><h6>Thông tin hành khách</h6></div>
                                    </div>
                                    <div className="cost">
                                        <div className="left-info"><span>Họ tên:</span></div>
                                        <div className="right-info"><span>{this.state.list.PersonInfor.FullName}</span></div>
                                        <div className="left-info"><span>Giấy tờ:</span></div>
                                        <div className="right-info"><span>{this.state.list.PersonInfor.Passport}</span></div>
                                    </div>
                                    <div className="cost">
                                        <div className="left-info"><h6>{this.state.list.TypeTicket}</h6></div>
                                        <div className="right-info"><span className="price">{this.state.list.Price} VNĐ</span></div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    }
                </div>
            </>

        );
    }
}
export default TicketCurrent;