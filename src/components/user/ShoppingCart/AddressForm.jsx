import React from 'react';
import { AuthUserContext } from './../../Session';
export default function AddressForm() {
    return (
        <React.Fragment>
            <AuthUserContext.Consumer>
                {authUser =>
                    <div className="pb-5" data-wizard-type="step-content" data-wizard-state="current">
                        <h4 className="mb-10 font-weight-bold text-dark">Enter Your Address</h4>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" className="form-control form-control-solid form-control-lg" placeholder="Your Name" value={authUser.username} disabled />
                            <span className="form-text text-muted">Please enter your Name.</span>
                        </div>
                        <div className="form-group">
                            <label>Your Email</label>
                            <input type="text" className="form-control form-control-solid form-control-lg" placeholder="Your Email" value={authUser.email} disabled />
                            <span className="form-text text-muted">Please enter your Email.</span>
                        </div>
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="form-group">
                                    <label>Your Seat</label>
                                    <input type="text" className="form-control form-control-solid form-control-lg" placeholder="Seat" value="100 A" />
                                    <span className="form-text text-muted">Please enter your Seat.</span>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" className="form-control form-control-solid form-control-lg" placeholder="City" value="Đà Nẵng" />
                                    <span className="form-text text-muted">Please enter your City.</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="form-group">
                                    <label>Toa Tàu</label>
                                    <input type="text" className="form-control form-control-solid form-control-lg" placeholder="Route" value="Toa 12" />
                                    <span className="form-text text-muted">Please enter your Toa Tàu.</span>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="form-group">
                                    <label>Country</label>
                                    <select name="country" className="form-control form-control-solid form-control-lg">
                                        <option value="">Select</option>
                                        <option value="VN">Viet Nam</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </AuthUserContext.Consumer>
        </React.Fragment>
    );
}