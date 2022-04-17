import React, { useEffect, useState } from "react";
import { auth, dbstore } from "../../Firebase/firebase"
import { Fragment } from "react";

export const HistoryBuy = () => {
  const [state, setstate] = useState({ Buyer: [] });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let fdata = [];
        dbstore.collection("Buyer-info")
          .where("BuyerId", "==", user.uid)
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
            setstate((s) => ({ ...s, Buyer: fdata }));
          });
      }
    });
  }, []);

  return (
    <>
      <div className="card card-custom">
        <div className="card-header flex-wrap py-5">
          <div className="card-title">
            <h3 className="card-label">History Buy
              {/* <div className="text-muted pt-2 font-size-sm">custom colu rendering</div> */}
            </h3>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover table-checkable" >
            <thead >
              <tr>
                <th>Quantity</th>
                <th>Product</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {state.Buyer.map((items, index) => (
                <Fragment>
                  <tr key={items.BuyerId + index + "buyer"}>

                    <td>{items.BuyerQuantity}</td>
                    <td>
                      {items.Information.map((item) => {
                        return (
                          <tr key={item.productId + index + "buyer"} className="w-5">
                            <td >{item.ProductName}</td>
                            <td>{item.qty}</td>
                          </tr>
                        );
                      })}
                    </td>
                    <td>{items.BuyerPayment} VNĐ</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
