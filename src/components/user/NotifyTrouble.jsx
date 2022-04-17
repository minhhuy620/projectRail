import React,{ Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { dbstore } from "../Firebase/firebase";
import { AuthUserContext, withAuthorization } from "../Session";
const NotifyTrouble = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <NotifyTroublePage authUser={authUser} />
        )}
    </AuthUserContext.Consumer>
);
class NotifyTroubleBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        dbstore.collection("Ticket")
            .where("uid", "==", this.props.authUser.uid).get()
            .then((querySnapshot) => {
                const fdata = [];
                querySnapshot.forEach((doct) => {
                    const idRoute = doct.data().Schedule.Route.IdRoute;
                    console.log("idroute", idRoute);
                    if (idRoute !== null) {
                        dbstore.collection("reportProblem")
                            .where("IdRoute", "==", idRoute)
                            .onSnapshot((snap) => {
                                snap.docChanges().forEach((change) => {
                                    const doc = { ...change.doc.data(), id: change.doc.id };
                                    console.log(doc);
                                    switch (change.type) {
                                        case "added":
                                            fdata.push(doc);
                                            break;
                                        case "modified":
                                            const i = fdata.findIndex((i) => i.id === doc.id);
                                            fdata[i] = doc;
                                            break;
                                        case "removed":
                                            fdata = fdata.filter((i) => i.id !== doc.id);
                                            break;
                                        default:
                                            break;
                                    }
                                });
                                this.setState({ data: fdata });
                            });
                    }
                });
            });
    }
render() {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name Train</th>
                        <th>Date</th>
                        <th>IdRoute</th>
                        <th>IdStaff</th>
                        <th>ReportInfor</th>
                        <th>TimeDelay</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((items, index) => {
                        return (
                            <tr key={items.id + index + "data"}>
                                <td>{items.NameTrain}</td>
                                <td>{new Date(items.Date.seconds*1000).toLocaleString()}</td>
                                <td>{items.IdRoute}</td>
                                <td>{items.IdStaff}</td>
                                <td>{items.StatusInfo}</td>
                                <td>{new Date(items.TimeDelay.seconds*1000).toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
}
const NotifyTroublePage = withFirebase(NotifyTroubleBase);
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(NotifyTrouble)