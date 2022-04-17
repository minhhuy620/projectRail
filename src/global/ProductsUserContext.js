import React, { createContext } from 'react';
import movedService from '../service/movedService';
// import { withFirebase } from '../components/Firebase';
// import { db } from '../config/Config';
import { dbstore } from './../components/Firebase/firebase'
export const ProductsUserContext = createContext();

export class ProductsUserContextProvider extends React.Component {

    //defining an innitial state with empty array of products
    state = {
        products: [],
        moved: [],
        id: 1
        // id: JSON.parse(localStorage.getItem('idRegion'))
    }
    componentDidUpdate() {
        movedService.getMoved().then((response) => {
            this.setState({ moved: response.data });
        });
        var listIdRegion = this.state.moved.find(x => x.idOrder >= 1)
        if (!!listIdRegion === true) {
            localStorage.setItem('idRegion', listIdRegion.idOrder + 2);
            if (listIdRegion.idOrder+2 === 5 || listIdRegion.idOrder+2 === 38 || listIdRegion.idOrder+2 === 97) {
                window.location.reload()
            }
        }
    }

    componentDidMount() {
        const prevProducts = this.state.products;
        dbstore.collection('Products').where('IdRegion', '>=', this.state.id).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductID: change.doc.id,
                        IdRegion: change.doc.data().IdRegion,
                        NameRegion: change.doc.data().NameRegion,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg,
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })

    }
    render() {
        return (
            <ProductsUserContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsUserContext.Provider>
        )
    }
}