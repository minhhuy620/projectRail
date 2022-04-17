import React, { createContext } from 'react';
import { dbstore } from '../components/Firebase/firebase'
export const TrainTicketContext = createContext();

export class TrainTicketContextProvider extends React.Component {

    //defining an innitial state with empty array of train_ticket
    state = {
        train_ticket: []
    }

    componentDidMount() {
        var listTrain_ticket = this.state.train_ticket;
        dbstore.collection('Ticket').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                const doc = { ...change.doc.data(), id: change.doc.id };
                switch (change.type) {
                    case "added":
                        listTrain_ticket.push(doc);
                        break;
                    case "modified":
                        const i = listTrain_ticket.findIndex((i) => i.id === doc.id);
                        listTrain_ticket[i] = doc;
                        break;
                    case "removed":
                        listTrain_ticket = listTrain_ticket.filter((i) => i.id !== doc.id);
                        break;
                    default:
                        break;
                }
                this.setState({
                    train_ticket: listTrain_ticket
                })
            })
        })
    }
    render() {
        return (
            <TrainTicketContext.Provider value={{ train_ticket: [...this.state.train_ticket] }}>
                {this.props.children}
            </TrainTicketContext.Provider>
        )
    }
}