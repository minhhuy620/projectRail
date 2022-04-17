import React, { createContext } from 'react';
import {dbstore, auth } from '../components/Firebase/firebase';

export const HistoryBuyContext = createContext();

export class HistoryBuyContextProvider extends React.Component {
    state = {
        historyBuy: []
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                const prevHistory = this.state.historyBuy;
                dbstore.collection('Buyer-info ' + user.uid).onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach(change => {
                        if (change.type === "added") {
                            prevHistory.push({
                                BuyerID: change.doc.id,
                                BuyerAddress: change.doc.data().BuyerAddress,
                                BuyerCell: change.doc.data().BuyerCell,
                                BuyerEmail: change.doc.data().BuyerEmail,
                                BuyerName: change.doc.data().BuyerName,
                                BuyerPayment: change.doc.data().BuyerPayment,
                                BuyerQuantity: change.doc.data().BuyerQuantity
                            })
                        }
                        this.setState({
                            historyBuy: prevHistory
                        })
                    })
                })
            }
        })
    }

    render() {
        return (
            <HistoryBuyContext.Provider value={{ historyBuy: [...this.state.historyBuy] }}>
                {this.props.children}
            </HistoryBuyContext.Provider>
        )
    }
}