import React, { createContext } from 'react';
import { dbstore } from '../components/Firebase/firebase'
export const RouteContext = createContext();

export class RouteContextProvider extends React.Component {

    //defining an innitial state with empty array of Route
    state = {
        Route: []
    }

    componentDidMount() {
        var listRoute = this.state.Route;
        dbstore.collection('Route').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                const doc = { ...change.doc.data(), id: change.doc.id };
                switch (change.type) {
                    case "added":
                        listRoute.push(doc);
                        break;
                    case "modified":
                        const i = listRoute.findIndex((i) => i.id === doc.id);
                        listRoute[i] = doc;
                        break;
                    case "removed":
                        listRoute = listRoute.filter((i) => i.id !== doc.id);
                        break;
                    default:
                        break;
                }
                this.setState({
                    Route: listRoute
                })
            })
        })
    }
    render() {
        return (
            <RouteContext.Provider value={{ Route: [...this.state.Route] }}>
                {this.props.children}
            </RouteContext.Provider>
        )
    }
}