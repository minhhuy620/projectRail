import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbstore } from "../../Firebase/firebase";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #8950FC;
`;

export const ListVoucher = () => {
    const [state, setState] = useState({ voucher: [] });
    const [color] = useState("#8950FC");
    const [loading] = useState(true);
    useEffect(() => {
        const fdata = [];
        dbstore.collection("Voucher").onSnapshot((res) => {
            res.docChanges().forEach((change) => {
                const doc = { ...change.doc.data(), id: change.doc.id };
                console.log(doc);
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
            setState((s) => ({ ...s, voucher: fdata }));
        });
    }, []);

    return (
        <>
            <div className="card card-custom">
                <div className="card-header flex-wrap py-5">
                    <div className="card-title">
                        <h3 className="card-label">List Product
                            {/* <div className="text-muted pt-2 font-size-sm">custom colu rendering</div> */}
                        </h3>
                    </div>
                    <div className="card-toolbar">
                        <Link to="/addvoucher" className="btn btn-primary font-weight-bolder">
                            <span className="svg-icon svg-icon-md">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <rect x="0" y="0" width="24" height="24" />
                                        <circle fill="#000000" cx="9" cy="15" r="6" />
                                        <path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3" />
                                    </g>
                                </svg>
                            </span>Add Voucher
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Voucher Code</th>
                                    <th className="text-center">Discount</th>
                                    <th className="text-center">Create Time</th>
                                    <th className="text-center">Time Expired</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.voucher === 0 &&
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <PropagateLoader color={color} loading={loading} css={override} size={15} />
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                }
                                {state.voucher.map((items, index) => (
                                    <tr key={items.id + index + "voucher"}>
                                        <td className="d-flex align-items-center">
                                        {items.id}
                                        </td>
                                        <td className="text-center align-middle">
                                        {items.Discount} VNĐ

                                        </td>

                                        <td className="text-center align-middle">
                                        {new Date(items.CreateTime.seconds * 1000).toLocaleDateString()}

                                        </td>
                                        <td className="text-center align-middle">
                                        {new Date(items.TimeExpired.seconds * 1000).toLocaleDateString()}

                                        </td>
                                        {/* <td className="text-center align-middle">

                                            <Link to={`/editproduct/${product.ProductID}`} className="navi-text text-muted text-hover-primary mr-3" title="Update">
                                                <i className="fas fa-edit" />
                                            </Link>
                                            <span className="navi-text text-muted text-hover-primary" title="Delete">
                                                <i className="far fa-trash-alt" onClick={onChangeDelete.bind(this, product.ProductID)}></i>
                                            </span>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
            /* <Link to={`/addvoucher`} className="btn btn-success">
        Add Voucher
      </Link>
      <table>
        <thead>
          <tr>
            <th>Voucher Code</th>
            <th>Discount</th>
            <th>Create Time</th>
            <th>Time Expired</th>
          </tr>
        </thead>
        <tbody>
          {state.voucher.map((items, index) => (
            <tr key={items.id + index + "voucher"}>
              <td>{items.id}</td>
              <td>{items.Discount}</td>
              <td>{new Date(items.CreateTime.seconds * 1000).toLocaleDateString()}</td>
              <td>{new Date(items.TimeExpired.seconds * 1000).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */
    )
};
