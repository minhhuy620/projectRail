import React from 'react';

export default function PaymentForm() {
    return (
        <React.Fragment>
            <div className="pb-5" data-wizard-type="step-content">
                <h4 className="mb-10 font-weight-bold text-dark">Enter your Payment Details</h4>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="form-group">
                            <label>Name on Card</label>
                            <input type="text" className="form-control form-control-solid form-control-lg" name="ccname" placeholder="Card Name" value="John Wick" />
                            <span className="form-text text-muted">Please enter your Card Name.</span>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="form-group">
                            <label>Card Number</label>
                            <input type="text" className="form-control form-control-solid form-control-lg" name="ccnumber" placeholder="Card Number" value="4444 3333 2222 1111" />
                            <span className="form-text text-muted">Please enter your Address.</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-4">
                        <div className="form-group">
                            <label>Card Expiry Month</label>
                            <input type="number" className="form-control form-control-solid form-control-lg" name="ccmonth" placeholder="Card Expiry Month" value="01" />
                            <span className="form-text text-muted">Please enter your Card Expiry Month.</span>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="form-group">
                            <label>Card Expiry Year</label>
                            <input type="number" className="form-control form-control-solid form-control-lg" name="ccyear" placeholder="Card Expire Year" value="21" />
                            <span className="form-text text-muted">Please enter your Card Expiry Year.</span>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="form-group">
                            <label>Card CVV Number</label>
                            <input type="password" className="form-control form-control-solid form-control-lg" name="cccvv" placeholder="Card CVV Number" value="123" />
                            <span className="form-text text-muted">Please enter your Card CVV Number.</span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}