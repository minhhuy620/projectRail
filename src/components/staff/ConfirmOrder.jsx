import React, { useEffect, useState } from "react";
import { dbstore } from '../Firebase/firebase';
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #8950FC;
`;
export const ConfirmOrder = () => {
  const [state, setstate] = useState({ Buyer: [] });
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading] = useState(true);
  const [color] = useState("#8950FC");
  // console.log(products);
  useEffect(() => {
    setFiltered(
      state.Buyer.filter((info) =>
        info.BuyerEmail.toLowerCase().includes(search.toLowerCase()),
      )
    );
  }, [search, state.Buyer]);
  const handleSearch = e => {
    setSearch(e.target.value);
  }
  useEffect(() => {
    let fdata = [];
    dbstore.collection("Buyer-info").onSnapshot((res) => {
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
  }, []);

  return (
    <>
      <div className="card card-custom">
        <div className="card-header flex-wrap py-5">
          <div className="card-title">
            <h3 className="card-label">Confirm Order
              {/* <div className="text-muted pt-2 font-size-sm">custom colu rendering</div> */}
            </h3>
          </div>
        </div>
        <div className="card-body">
          <div className="mb-7">
            <div className="row align-items-center">
              <div className="col-lg-9 col-xl-8">
                <div className="row align-items-center">
                  <div className="col-md-4 my-2 my-md-0">
                    <div className="input-icon">
                      <input type="text" className="form-control" placeholder="Search..." onChange={handleSearch} />
                      <span>
                        <i className="flaticon2-search-1 text-muted"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                {/* <tr>
                                    <th>Image</th>
                                    <th className="text-center">Product Name</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Actions</th>
                                    <th></th>
                                </tr> */}
                <tr>
                  <th>Buyer ID</th>
                  <th>Date</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>User Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Details Product</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 &&
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <PropagateLoader color={color} loading={loading} css={override} size={15} />
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                }
                {filtered.map((items, index) => (
                  <tr key={items.BuyerId + index + "buyer"}>
                    <td className="text-center align-middle">
                      {items.BuyerId}
                    </td>
                    <td className="text-center align-middle">
                      {new Date(items.createTime.seconds * 1000).toLocaleString()}
                    </td>
                    <td className="text-center align-middle">
                      {items.BuyerCell}
                    </td>
                    <td className="text-center align-middle">
                      {items.BuyerEmail}
                    </td>
                    <td className="text-center align-middle">
                      {items.BuyerName}
                    </td>
                    <td className="text-center align-middle">
                      {items.BuyerPayment}
                    </td>
                    <td className="text-center align-middle">
                      {items.BuyerQuantity}
                    </td>
                    {items.Information.map((item) => {
                      return (
                        <tr key={item.ProductID + index + "buyer"}>
                          <td className="text-center align-middle">{item.ProductName}</td>
                          <td className="text-center align-middle">{item.qty}</td>
                        </tr>
                      );
                    })}
                    <td className="text-center align-middle">
                      {items.isShipped === false ? (
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dbstore
                              .collection(`Buyer-info`)
                              .doc(items.BuyerId + "_" + items.createTime.seconds)
                              .update({ isShipped: true })
                          }
                        >
                          UnShip
                        </i>
                      ) : (
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dbstore
                              .collection(`Buyer-info`)
                              .doc(items.BuyerId + "_" + items.createTime.seconds)
                              .update({ isShipped: false })
                          }
                        >
                          Ship
                        </i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
