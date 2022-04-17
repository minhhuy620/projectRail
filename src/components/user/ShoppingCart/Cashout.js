import React, { useState, useContext } from 'react'
import { CartContext } from '../../../global/CartContext'
import { useHistory } from 'react-router-dom'
import { withFirebase } from './../../../components/Firebase';
import { AuthUserContext } from './../../Session';
import { dbstore, auth } from '../../Firebase/firebase';
import '../../../index.css'
const Cashout = () => {
    const history = useHistory();
    const { dispatch } = useContext(CartContext);
    const { shoppingCart, totalPrice, totalQty, isUsed } = JSON.parse(localStorage.getItem("cart")) === null ? {} : JSON.parse(localStorage.getItem("cart"));
    // defining state
    const [cell, setCell] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const cashoutSubmit = (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(user => {
            if (user) {
                const date = new Date();
                const time = date.getTime();
                dbstore.collection("Buyer-info")
                    .doc(user.uid + "_" + Math.floor(time / 1000))
                    .set({
                        BuyerId: user.uid,
                        BuyerName: user.displayName,
                        BuyerEmail: user.email,
                        BuyerCell: cell,
                        BuyerPayment: totalPrice,
                        BuyerQuantity: totalQty,
                        isShipped: false,
                        createTime: date,
                        Information: shoppingCart,
                    })
                    .then(() => {
                        setCell("");
                        dispatch({ type: "EMPTY" });
                        setSuccessMsg(
                            "Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds"
                        );
                        setTimeout(() => {
                            history.push("/products");
                        }, 5000);
                    })
                    .catch((err) => setError(err.message));
                dbstore.collection('CustomerVoucher').doc(isUsed)
                    .update({
                        isUsed: true
                    })
            }
        });

    }

    return (
        <AuthUserContext.Consumer>
            {authUser =>
                <div>
                    {/* <Navbar user={props.user} /> */}
                    <div className="container">
                        <br />
                        <h2>Cashout Details</h2>
                        <br />
                        {successMsg && <div className="success-msg">{successMsg}</div>}
                        <form
                            autoComplete="off"
                            className="form-group"
                            onSubmit={cashoutSubmit}
                        >
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={authUser.username}
                                disabled
                            />
                            <br />
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                required
                                value={authUser.email}
                                disabled
                            />
                            <br />
                            <label htmlFor="Cell No">Cell No</label>
                            <input
                                type="number"
                                className="form-control"
                                required
                                onChange={(e) => setCell(e.target.value)}
                                value={cell}
                                placeholder="eg 03123456789"
                            />
                            <br />
                            {shoppingCart.map((cartt) => (
                                <div>
                                    <label htmlFor="Product">Product</label>
                                    <input
                                        type="productname"
                                        className="form-control"
                                        required
                                        value={cartt.ProductName}
                                        disabled
                                    />
                                    <input
                                        type="quantity"
                                        className="form-control"
                                        required
                                        value={cartt.ProductQty}
                                        disabled
                                    />
                                </div>
                            ))}
                            <br />
                            <label htmlFor="Price To Pay">Price To Pay</label>
                            <input
                                type="number"
                                className="form-control"
                                required
                                value={totalPrice}
                                disabled
                            />
                            <br />
                            <label htmlFor="Total No of Products">Total No of Products</label>
                            <input
                                type="number"
                                className="form-control"
                                required
                                value={totalQty}
                                disabled
                            />
                            <br />
                            <button type="submit" className="btn btn-success btn-md mybtn">
                                SUBMIT
                            </button>
                        </form>
                        {error && <span className="error-msg">{error}</span>}
                    </div>
                </div>
            }
        </AuthUserContext.Consumer>
    )
}
export default withFirebase(Cashout)


// import React, { useState, useContext } from 'react'
// // import { auth, db } from '../config/Config'
// import { CartContext } from '../../../global/CartContext'
// import './CashOut.css';
// import { useHistory } from 'react-router-dom'
// import { withFirebase } from './../../../components/Firebase';
// import { AuthUserContext } from './../../Session';
// import { dbstore, auth } from '../../Firebase/firebase';
// import '../../../index.css'
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';

// import Typography from '@material-ui/core/Typography';
// import AddressForm from './AddressForm';
// import PaymentForm from './PaymentForm';
// import Review from './Review';

// const useStyles = makeStyles((theme) => ({
//     layout: {
//         width: 'auto',
//         marginLeft: theme.spacing(2),
//         marginRight: theme.spacing(2),
//         [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
//             width: '80%',
//             marginLeft: 'auto',
//             marginRight: 'auto',
//         },
//     },
//     paper: {
//         marginTop: theme.spacing(3),
//         marginBottom: theme.spacing(3),
//         padding: theme.spacing(2),
//         [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
//             marginTop: theme.spacing(6),
//             marginBottom: theme.spacing(6),
//             padding: theme.spacing(3),
//         },
//     },
//     stepper: {
//         fontWeight: '300',
//         fontSize: '1.2em',
//         padding: theme.spacing(3, 0, 5),
//     },
//     stepper1: {
//         color: '#a171fc',
//     },
// }));
// const steps = ['Shipping Address', 'Payment Details', 'Review Your Order'];
// function getStepContent(step) {
//     switch (step) {
//         case 0:
//             return <AddressForm />;
//         case 1:
//             return <PaymentForm />;
//         case 2:
//             return <Review />;
//         default:
//             throw new Error('Unknown step');
//     }
// }

// const Cashout = () => {
//     const history = useHistory();
//     const { shoppingCart, dispatch, totalPrice, totalQty } =
//         useContext(CartContext);
//     // defining state
//     const [cell, setCell] = useState('');
//     const [address, setAddress] = useState('');
//     // const [error, setError] = useState('');
//     // const [successMsg, setSuccessMsg] = useState('');
//     const classes = useStyles();
//     const [activeStep, setActiveStep] = React.useState(0);

//     const cashoutSubmit = (e) => {
//         e.preventDefault();
//         auth.onAuthStateChanged(user => {
//             if (user) {
//                 const date = new Date();
//                 const time = date.getTime();
//                 dbstore.collection("Buyer-info")
//                     .doc(user.uid + "_" + time)
//                     .set({
//                         BuyerId: user.uid,
//                         BuyerName: user.displayName,
//                         BuyerEmail: user.email,
//                         BuyerCell: cell,
//                         BuyerPayment: totalPrice,
//                         BuyerQuantity: totalQty,
//                         isShipped: false,
//                         createTime: time,
//                         Information: shoppingCart,
//                     }).then(() => {
//                         setCell('');
//                         setAddress('');
//                         dispatch({ type: 'EMPTY' })
//                         // setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds');
//                         setTimeout(() => {
//                             history.push('/products')
//                         }, 5000)
//                     });//.catch(err => setError(err.message))
//             }
//         })
//     }


//     const handleNext = () => {
//         setActiveStep(activeStep + 1);
//     };

//     const handleBack = () => {
//         setActiveStep(activeStep - 1);
//     };
//     return (
//         // <AuthUserContext.Consumer>
//         //     {authUser =>
//                 <>
//                     <React.Fragment>
//                         <main className={classes.layout}>
//                             <Paper className={classes.paper}>
//                                 <Typography component="h1" variant="h3" align="center">
//                                     Checkout
//                                 </Typography>
//                                 <Stepper activeStep={activeStep} className={classes.stepper}>
//                                     {steps.map((label) => (
//                                         <Step key={label} >
//                                             <StepLabel className={classes.stepper1}>{label}</StepLabel>
//                                         </Step>
//                                     ))}
//                                 </Stepper>
//                                 <React.Fragment>
//                                     <form className="form mt-0 mt-lg-10" onSubmit={cashoutSubmit}>
//                                         {activeStep === steps.length ? (
//                                             <React.Fragment>
//                                                 <Typography variant="h5" gutterBottom>
//                                                     Thank you for your order.
//                                                 </Typography>
//                                                 <Typography variant="subtitle1">
//                                                     Your order number is #2001539. We have emailed your order confirmation, and will
//                                                     send you an update when your order has shipped.
//                                                 </Typography>
//                                             </React.Fragment>
//                                         ) : (
//                                             <React.Fragment>
//                                                 {getStepContent(activeStep)}
//                                                 <div className="d-flex justify-content-between border-top mt-5 pt-10">
//                                                     <div className="mr-2">
//                                                         {activeStep !== 0 && (
//                                                             <Button onClick={handleBack} className="btn btn-light-info font-weight-bolder text-uppercase px-9 py-4">
//                                                                 Back
//                                                             </Button>
//                                                         )}
//                                                     </div>
//                                                     <Button
//                                                         variant="contained"
//                                                         color="primary"
//                                                         onClick={handleNext}
//                                                         className="btn btn-info font-weight-bolder text-uppercase px-9 py-4"
//                                                     >
//                                                         {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
//                                                     </Button>

//                                                 </div>
//                                             </React.Fragment>
//                                         )}
//                                     </form>
//                                 </React.Fragment>
//                             </Paper>
//                         </main>
//                     </React.Fragment>
//                 </>
//             // }
//         // </AuthUserContext.Consumer>
//     )
// }
// export default withFirebase(Cashout)
