import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbstore } from "../components/Firebase/firebase";

export const ListProblem = () => {
  const [state, setState] = useState({ Problem: [] });

  useEffect(() => {
    let fdata = [];
    dbstore.collection("reportProblem").onSnapshot((res) => {
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
      setState((s) => ({ ...s, Problem: fdata }));
    });
  }, []);

  return (
    <>
      <div className="card card-custom">
        <div className="card-header flex-wrap py-5">
          <div className="card-title">
            <h3 className="card-label">List Problem
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
                      <input type="text" className="form-control" placeholder="Search..." id="kt_datatable_search_query" />
                      <span>
                        <i className="flaticon2-search-1 text-muted"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-bordered table-hover table-checkable" >
            <thead >
              <tr>
                <th>ID Problem</th>
                <th>ID Route</th>
                <th>ID Staff</th>
                <th>Date</th>
                <th>Time Delay</th>
                <th>Information</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.Problem.map((items, index) => (
                <tr key={items.id + index + "Problem"}>
                  <td>{items.id}</td>
                  <td>{items.IdRoute}</td>
                  <td>{items.IdStaff}</td>
                  <td>{new Date(items.Date.seconds * 1000).toLocaleString()}</td>
                  <td>{new Date(items.TimeDelay.seconds * 1000).toLocaleString()}</td>
                  <td>{items.StatusInfo}</td>
                  <td>
                    <Link
                      to={`/detailroute/${items.IdRoute}`}
                      className="btn btn-light-info font-weight-bold mr-2"
                    >
                      Detail Route
                    </Link>
                    &nbsp;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
};
