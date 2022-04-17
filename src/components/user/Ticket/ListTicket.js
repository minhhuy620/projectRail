import React from 'react';
import { AuthUserContext, withAuthorization } from '../../Session';
import { compose } from 'recompose';
import { withFirebase } from '../../Firebase';
import { dbstore } from '../../Firebase/firebase';
const ListTicket = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <ListTicketPage authUser={authUser} />
            </div>
        )}
    </AuthUserContext.Consumer>
);
class ListTicketBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    componentDidMount() {
        var listTicket = this.state.list;
        dbstore.collection('Ticket').where('uid', '==', this.props.authUser.uid).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                const doc = { ...change.doc.data(), id: change.doc.id };
                switch (change.type) {
                    case "added":
                        listTicket.push(doc);
                        break;
                    case "modified":
                        const i = listTicket.findIndex((i) => i.id === doc.id);
                        listTicket[i] = doc;
                        break;
                    case "removed":
                        listTicket = listTicket.filter((i) => i.id !== doc.id);
                        break;
                    default:
                        break;
                }
                this.setState({
                    list: listTicket
                })
            })
        })
    }
    render() {
        return (
            <>
                <div className="row justify-content-center">
                    {this.state.list.map(list =>
                        <div className="col-xl-3 col-sm-6 col-md-3 col-xs-12" key={list.id}>
                            <article className="card card-big mb15" >

                                <div className="card__img-wrap">
                                    <img src="./assets/css/Logo-Railcare/3railcare.png" alt='' style={{ 'width': '100%' }} />
                                    <div>
                                        <span className="title title-overlay-left">{list.IdTicket}</span>
                                        <span className="title title-overlay-left-2">Tàu: {list.Schedule.Route.Train.NameTrain}</span>
                                    </div>
                                </div>
                                <div className="card__info">
                                    <div className="title-left-wrap"> <h5>{list.Schedule.Route.Station.Departure.NameStation}</h5> <small> ga đi </small></div>
                                    <span className="icon-wrap"><i className="fas fa-arrow-right"></i> <i className="fas fa-train"></i></span>
                                    <div className="title-right-wrap"> <h5>{list.Schedule.Route.Station.Destination.NameStation}</h5> <small>ga đến </small></div>
                                </div>
                                <div className="card__pricelist">
                                    <div className="cost">
                                        <div className="left-wrap"><var>{new Date(list.Schedule.Route.DepartureTime.seconds * 1000).toLocaleString()}</var></div>
                                        <div className="icon-wrap"> <i className="material-icons"></i></div>
                                        <div className="right-wrap"><var>{new Date(list.Schedule.Route.DestinationTime.seconds * 1000).toLocaleString()}</var></div>
                                    </div>
                                    <div className="cost">
                                        <div className="left-info"><span>{list.Schedule.Coach.NameCoach}</span></div>
                                        {/* <div className="icon-wrap"> <i className="material-icons"></i></div> */}
                                        <div className="right-info"><span>Chỗ {list.Seat.NumberSeat}</span></div>
                                        <div className="left-info"><span>{list.Schedule.Coach.TypeCoach}</span></div>

                                    </div>
                                    <div className="card__info">
                                        <div className="title-wrap"><h6>Thông tin hành khách</h6></div>
                                    </div>
                                    <div className="cost">
                                        <div className="left-info"><span>Họ tên:</span></div>
                                        <div className="right-info"><span>{list.PersonInfor.FullName}</span></div>
                                        <div className="left-info"><span>Giấy tờ:</span></div>
                                        <div className="right-info"><span>{list.PersonInfor.Passport}</span></div>
                                    </div>
                                    <div className="cost">
                                        <div className="left-info"><h6>{list.TypeTicket}</h6></div>
                                        <div className="right-info"><span className="price">{list.Price} VNĐ</span></div>
                                    </div>
                                </div>

                            </article>

                        </div>
                    )}

                </div>
   
            </>

        );
    }
}
const ListTicketPage = withFirebase(ListTicketBase);
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(ListTicket)