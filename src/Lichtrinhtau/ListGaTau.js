import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbstore } from "../components/Firebase/firebase";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #8950FC;
`;
export const ListGaTau = () => {
  const [state, setState] = useState({ Ga: [] });
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#8950FC");
  useEffect(() => {
    setFiltered(
      state.Ga.filter((info) =>
        info.IdStation.toLowerCase().includes(search.toLowerCase()),
      )
    );
  }, [search, state.Ga]);
  const handleSearch = e => {
    setSearch(e.target.value);
  }
  useEffect(() => {
    const fdata = [];
    dbstore.collection("Station")
      .onSnapshot((res) => {
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
            // case "removed":
            //   fdata = fdata.filter((i) => i.id !== doc.id);
            //   break;
            default:
              break;
          }
        });
        setState((s) => ({ ...s, Ga: fdata }));
      });
  }, []);
  const onChangeDelete = (id) => {
    dbstore.collection('Station').doc(id).delete().then(() => {
      window.location.reload()
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  return (
    <>
      <div className="card card-custom">
        <div className="card-header flex-wrap py-5">
          <div className="card-title">
            <h3 className="card-label">List Station
            </h3>
          </div>
          <div className="card-toolbar">
            <Link to={`/add/Station`} className="btn btn-primary font-weight-bolder">
              <span className="svg-icon svg-icon-md">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <rect x="0" y="0" width="24" height="24" />
                    <circle fill="#000000" cx="9" cy="15" r="6" />
                    <path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3" />
                  </g>
                </svg>
              </span>Add Station
            </Link>
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
                  <th>ID Station</th>
                  <th className="text-center">Station Name</th>
                  <th className="text-center">Station Type</th>
                  <th className="text-center">Lat</th>
                  <th className="text-center">Lng</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 &&
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="text-center">
                      <PropagateLoader color={color} loading={loading} css={override} size={15} />
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                }
                {filtered.map((items, index) => (
                  <tr key={items.id + index + "ga"}>
                    <td className="align-middle">
                      {items.IdStation}

                    </td>

                    <td className="text-center align-middle">
                      {items.NameStation}

                    </td>
                    <td className="text-center align-middle">
                      {items.TypeStation}

                    </td>
                    <td className="text-center align-middle">
                      {items.LatStation}

                    </td>
                    <td className="text-center align-middle">
                      {items.LngStation}

                    </td>
                    <td className="text-center align-middle">
                      <Link to={`/edit/Station/${items.id}`} className="navi-text text-muted text-hover-primary mr-3" title="Edit">
                        <i className="fas fa-edit" />
                      </Link>
                      <Link to={`/detail/Station/${items.id}`} className="navi-text text-muted text-hover-primary mr-3" title="Detail">
                        <i className="fas fa-info-circle" />
                      </Link>
                      <span className="navi-text text-muted text-hover-primary" title="Delete">
                        <i className="far fa-trash-alt" onClick={onChangeDelete.bind(this, items.id)}></i>
                      </span>
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
