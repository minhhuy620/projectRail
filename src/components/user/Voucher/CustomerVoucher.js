import React, { useEffect, useState } from 'react';
import { auth, dbstore } from '../../Firebase/firebase';

export const CustomerVoucher = () => {

    const [state, setState] = useState({ CVoucher: [] });

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const fdata = [];
                dbstore.collection("CustomerVoucher")
                    .where("uid", "==", user.uid)
                    .onSnapshot((res) => {
                        res.docChanges().forEach((change) => {
                            const doc = { ...change.doc.data(), id: change.doc.id };
                            switch (change.type) {
                                case "added":
                                    fdata.push(doc);
                                    break;
                                case "modified":
                                    const i = fdata.findIndex((i) => i.id === doc.id);
                                    fdata[i] = doc;
                                    break;
                                case "removed":
                                    fdata = fdata.filter((i) => i.id !== doc.id);
                                    break;
                                default:
                                    break;
                            }
                        });
                        setState((s) => ({ ...s, CVoucher: fdata }));
                    });
            }
        });
    }, []);
    const isUsedCheck = (isUsed) => {
        return (
            <div>
                {isUsed === false ? ("Not Used yet") : ("Used")}
            </div>
        )
    }
    return (
        <div>
            <div className="container mt-5">
                <div className="d-flex justify-content-center row">
                {state.CVoucher.map((item, index) => (
                    <div className="col-md-5" key={item.id + index + "voucher"}>
                        <div className="coupon p-3 bg-white">
                            <div className="row no-gutters">
                                <div className="col-md-4 border-right">
                                    <div className="d-flex flex-column align-items-center"><i className="fas fa-gift fa-2x" style={{"color":"#8950FC"}}></i><span className="d-block">{new Date(item.TimeExpired.seconds * 1000).toLocaleDateString()}</span><span className="text-black-50">{isUsedCheck(item.isUsed)}</span></div>
                                </div>
                                <div className="col-md-8">
                                    <div>
                                        <div className="d-flex flex-row justify-content-end off">
                                            <h1>{item.Discount}</h1><span>VND</span>
                                        </div>
                                        <div className="d-flex flex-row justify-content-between off px-3 p-2"><span>Voucher code:</span><span className="border border-primary px-3 rounded code">{item.IdVoucher}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* <table>
                <thead>
                    <tr>
                        <th>Voucher Code</th>
                        <th>Discount</th>
                        <th>Time Expired</th>
                        <th>Used</th>
                    </tr>
                </thead>
                <tbody>
                    {state.CVoucher.map((item, index) => (
                        <tr key={item.id + index + "voucher"}>
                            <td>{item.IdVoucher}</td>
                            <td>{item.Discount} VND</td>
                            <td>{new Date(item.TimeExpired.seconds * 1000).toLocaleDateString()}</td>
                            <td>{isUsedCheck(item.isUsed)}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    )
}
