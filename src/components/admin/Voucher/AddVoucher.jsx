import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { dbstore } from "../../Firebase/firebase";

export const AddVoucher = () => {
  const [voucherId, setVoucherId] = useState("");
  const [discount, setDiscount] = useState(0);
  const [timeExpired, setTimeExpired] = useState();
  const history = useHistory();

  const addVoucher = (e) => {
    e.preventDefault();
    dbstore.collection("Voucher").doc(voucherId)
      .set({
        CreateTime: new Date(),
        Discount: Number(discount),
        TimeExpired: new Date(timeExpired),
      })
      .then(() => {
        toast.success('Add Voucher Successfully.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          })
      })
      .catch((err) => console.error(err));
  };
  const cancel = () => {
    history.push('/listvoucher');
}
  return (
    <div>
         <div className="d-flex flex-row">
                <div className="flex-row-fluid ml-lg-8">
                    <div className="card card-custom card-stretch">
                        <div className="card-header py-3">
                            <div className="card-title align-items-start flex-column">
                                <h3 className="card-label font-weight-bolder text-dark">Add Voucher</h3>
                            </div>
                            <div className="card-toolbar">
                                <button type="submit" form='my-form' className="btn btn-info mr-2">Add</button>
                                <button type="reset" onClick={cancel} className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                        <form className="form" id='my-form' autoComplete="off" onSubmit={addVoucher}>
                            <div className="card-body">
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Id Voucher</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <input className="form-control form-control-lg form-control-solid" type="text" required
                                            onChange={(e) => setVoucherId(e.target.value)} value={voucherId} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Discount</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <input className="form-control form-control-lg form-control-solid" type="text" required
                                            onChange={(e) => setDiscount(e.target.value)} value={discount} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Time Expired</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <input className="form-control form-control-lg form-control-solid" type="datetime-local" required
                                            onChange={(e) => setTimeExpired(e.target.value)} value={timeExpired} />
                                    </div>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        {/* <form autoComplete="off" className='form-group' onSubmit={addVoucher}>
            <label htmlFor="voucher-id">Voucher Code</label>
            <br />
            <input type="text" className='form-control' required
                onChange={(e) => setVoucherId(e.target.value)} value={voucherId} />
            <br />
            <label htmlFor="discount">Discount</label>
            <br />
            <input type="text" className='form-control' required
                onChange={(e) => setDiscount(e.target.value)} value={discount} />
            <br />
            <label htmlFor="timeexpired">Time Expired</label>
            <br />
            <input type="datetime-local" className='form-control' required
                onChange={(e) => setTimeExpired(e.target.value)} value={timeExpired} />
            <br/>
            <button type='submit' className='btn btn-success btn-md mybtn'>Add</button>
        </form> */}
    </div>
  );
};
