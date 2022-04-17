import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../global/CartContext'
import { Icon } from 'react-icons-kit'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { compose } from 'recompose';
import { withAuthorization } from '../../Session';
import '../../../index.css'
import { auth, dbstore } from '../../Firebase/firebase'
const Cart = () => {
    const { dispatch } = useContext(CartContext);
    const [state, setState] = useState({
        shoppingCart: [],
        totalPrice: 0,
        totalQty: 0,
        voucher: 0,
    });
    const [count, setCount] = useState(0)
    const [IdVoucher, setIdVoucher] = useState('');
    const addVoucher = (e) => {
        e.preventDefault();
        const currentTime = new Date().toLocaleDateString();
        console.log(currentTime);
        auth.onAuthStateChanged((user) => {
            if (user) {
                dbstore.collection('CustomerVoucher')
                    .where("IdVoucher", "==", IdVoucher)
                    .where("uid", "==", user.uid)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const timeEx = new Date(doc.data().TimeExpired.seconds * 1000).toLocaleDateString();
                            const discount = doc.data().Discount;
                            const isUsed = doc.data().isUsed;
                            console.log("timeex", timeEx);
                            console.log("discount", discount);
                            if (timeEx >= currentTime && isUsed == false) {
                                const dataLocalStorage = JSON.parse(localStorage.getItem("cart")) === null ? {} : JSON.parse(localStorage.getItem("cart"))
                                setState({
                                    ...state,
                                    shoppingCart: dataLocalStorage.shoppingCart ?? [],
                                    totalPrice: dataLocalStorage.totalPrice ?? 0,
                                    totalQty: dataLocalStorage.totalQty ?? 0,
                                    voucher: discount ?? 0,
                                });
                                const localStorageData = {
                                    shoppingCart: dataLocalStorage.shoppingCart ?? [],
                                    totalPrice: dataLocalStorage.totalPrice - discount ?? 0,
                                    totalQty: dataLocalStorage.totalQty ?? 0,
                                    voucher: discount ?? 0,
                                    isUsed: doc.id ?? 0,
                                };
                                localStorage.setItem("cart", JSON.stringify(localStorageData));
                                console.log(doc.id)
                            }
                        })
                    })
            }
        })
    }
    useEffect(() => {
        const dataLocalStorage = JSON.parse(localStorage.getItem("cart")) === null ? {} : JSON.parse(localStorage.getItem("cart"));
        setState(state => ({
            ...state,
            shoppingCart: dataLocalStorage.shoppingCart ?? [],
            totalPrice: dataLocalStorage.totalPrice ?? 0,
            totalQty: dataLocalStorage.totalQty ?? 0,
            voucher: dataLocalStorage.voucher ?? 0,
        }));
    }, [count]);

    useEffect(() => {
        window.addEventListener("storage", () => {
            const dataLocalStorage = JSON.parse(localStorage.getItem("cart")) ?? {};
            setState(state => ({
                ...state,
                shoppingCart: dataLocalStorage.shoppingCart ?? [],
                totalPrice: dataLocalStorage.totalPrice ?? 0,
                totalQty: dataLocalStorage.totalQty ?? 0,
                voucher: dataLocalStorage.voucher ?? 0,
            }));
        });
    }, []);
    if (state.shoppingCart != null && state.shoppingCart != undefined)
        return (
            <>
                <div className="d-flex flex-row">
                    <div className="flex-row-fluid">
                        {state.shoppingCart.length !== 0}
                        <div className="card card-custom gutter-b">
                            <div className="card-header flex-wrap border-0 pt-6 pb-0">
                                <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label font-weight-bolder font-size-h3 text-dark">Your Cart</span>
                                </h3>
                                <div className="card-toolbar">
                                    <div className="dropdown dropdown-inline">
                                        <Link to='/products' className="btn btn-info font-weight-bolder font-size-sm">
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th className="text-center">Qty</th>
                                                <th className="text-center">Price</th>
                                                <th className="text-right" colSpan="2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.shoppingCart?.map((cart) => {
                                                return (
                                                    <tr key={cart.ProductID}>
                                                        <td className="d-flex align-items-center font-weight-bolder">
                                                            <div className="symbol symbol-60 flex-shrink-0 mr-4">
                                                                <img src={cart.ProductImg} className="symbol-label" alt="not found" />
                                                                <div className="text-dark text-hover-primary">{cart.ProductName}</div>
                                                            </div>

                                                        </td>
                                                        <td className="text-center align-middle">
                                                            <div onClick={() => setCount(count + 1)}>
                                                                <button className="btn btn-xs btn-light-info btn-icon" onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                                                    <i className="ki ki-plus icon-xs"></i>
                                                                </button>
                                                            </div>
                                                            <div className="font-weight-bolder">
                                                                <span >{cart.ProductQty}</span>
                                                            </div>
                                                            <div onClick={() => setCount(count - 1)}>
                                                                <button className="btn btn-xs btn-light-info btn-icon" onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                                                    <i className="ki ki-minus icon-xs"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="text-center align-middle font-weight-bolder font-size-h5">
                                                            {cart.ProductPrice * cart.ProductQty} VNĐ

                                                        </td>
                                                        {/* <td className="text-right align-middle">
                                                            
                                                        </td> */}
                                                        <td className="text-right align-middle" colSpan="2">
                                                            <div onClick={() => setCount(count + 1)}>
                                                                <button className="btn btn-info font-weight-bolder font-size-sm" onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                                                    <Icon icon={iosTrashOutline} size={20} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                )
                                            })
                                            }
                                            {state.shoppingCart.length > 0 &&
                                                <tr>
                                                    <td colSpan="3"></td>
                                                    <td className="font-weight-bolder font-size-h4 text-right">Total Price:</td>
                                                    <td className="font-weight-bolder font-size-h4 text-right">{state.totalPrice - state.voucher} VNĐ</td>
                                                </tr>
                                            }
                                            {
                                                state.shoppingCart.length === 0 && <>
                                                    <div className="">
                                                        <div className="d-flex align-items-center font-weight-bolder">
                                                            <div className='text-center'>Your cart is empty</div>
                                                        </div>
                                                        <Link to="/products" className="align-items-center ">
                                                            <div className="btn btn-outline-info">Return to purchase</div>
                                                        </Link>
                                                    </div>
                                                </>
                                            }
                                            <tr>
                                                <td colSpan="5" className="border-0 text-muted text-right pt-0">The price is exclusive of tax</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="border-0 pt-10">
                                                    <form onSubmit={addVoucher}>
                                                        <div className="form-group row">
                                                            <div className="col-md-2 d-flex align-items-center">
                                                                <label className="font-weight-bolder">Apply Voucher</label>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="input-group w-100">
                                                                    <input type="text" className="form-control" placeholder="Voucher Code" value={IdVoucher} onChange={(e) => setIdVoucher(e.target.value)} />
                                                                    <div className="input-group-append">
                                                                        <button className="btn btn-secondary" type="button" onClick={addVoucher}>Apply</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>

                                                </td>
                                                {state.shoppingCart.length > 0 ?
                                                <td colSpan="4" className="border-0 text-right pt-18">
                                                    <Link to='/cashout' className="btn btn-info font-weight-bolder px-8">
                                                        Checkout
                                                    </Link>
                                                </td>
                                                :
                                                <td colSpan="4" className="border-0 text-right pt-18">
                                                    {/* <Link to='/cashout' className="btn btn-info font-weight-bolder px-8" >
                                                        Checkout
                                                    </Link> */}
                                                </td>
                                                }
                                                {/* <td colSpan="2" className="border-0 text-right pt-18">
                                                    <button id="paypal-button" className="btn btn-info font-weight-bolder px-8">
                                                        Paypal
                                                    </button>
                                                </td> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    return (
        <>
            <div>
                no items in your cart or slow internet causing trouble (Refresh the
                page) or you are not logged in
            </div>
            <div>
                <Link to="/">Return to Home page</Link>
            </div>
        </>
    );
}
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(Cart);


