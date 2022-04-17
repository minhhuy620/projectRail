import React, { useEffect, useState } from "react";
import { dbstore } from "../components/Firebase/firebase";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #8950FC;
`;
export const RouteBoard = () => {
  const [state, setState] = useState({ routelist: [] });
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading] = useState(true);
  const [color] = useState("#8950FC");
  useEffect(() => {
    setFiltered(
      state.routelist.filter((info) =>
        info.Train.NameTrain.toLowerCase().includes(search.toLowerCase()),
      )
    );
  }, [search, state.routelist]);
  const handleSearch = e => {
    setSearch(e.target.value);
  }
  useEffect(() => {
    const fdata = [];
    const currentTime = new Date().toLocaleDateString();
    dbstore.collection("Route").onSnapshot((res) => {
      res.docChanges().forEach((change) => {
        const doc = { ...change.doc.data(), id: change.doc.id };
        // console.log((change.doc.data().Date).toDate());
        const date = new Date(change.doc.data().Date.seconds * 1000).toLocaleDateString();
        console.log(date);
        console.log(currentTime);
        switch (change.type) {
          case "added":
            if (date === currentTime) {
              fdata.push(doc);
              break;
            }
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
      setState((s) => ({ ...s, routelist: fdata }));
    });
  }, []);

  return (
    <>
      <div className="card card-custom">
        <div className="card-header flex-wrap py-5">
          <div className="card-title">
            <h3 className="card-label">Route Board
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
                <tr>
                  <th className="text-left">Departure</th>
                  {/* <th className="text-center">{"->"}</th> */}
                  <th className="text-left">Destination</th>
                  <th className="text-center">Train</th>
                  <th className="text-center">Departure Time</th>
                  <th className="text-center">Destination Time</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 &&
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="text-right">
                      Not found
                    </td>
                    <td></td>
                    <td></td>
                  </tr>

                }
                {filtered.map((item, index) => (
                  <tr key={item.id + index + "route"}>
                    <td className="text-left align-middle">
                      {item.Station.Departure.NameStation}
                    </td>

                    <td className="text-left align-middle">
                      {item.Station.Destination.NameStation}
                    </td>
                    <td className="text-center align-middle">
                      {item.Train.NameTrain}
                    </td>
                    <td className="text-center align-middle">
                      {new Date(item.DepartureTime.seconds * 1000).toLocaleString()}

                    </td>
                    <td className="text-center align-middle">
                      {new Date(item.DestinationTime.seconds * 1000).toLocaleString()}
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
};
