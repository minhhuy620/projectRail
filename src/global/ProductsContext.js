import React, { createContext } from 'react';
import { dbstore } from './../components/Firebase/firebase'
export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    //defining an innitial state with empty array of products
    state = {
        products: [],
    }

    componentDidMount() {
        const prevProducts = this.state.products;
        dbstore.collection('Products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductID: change.doc.id,
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
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}