import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { dbstore } from "../components/Firebase/firebase";

export const FormGaTau = () => {
  const history = useHistory();
  const info = history.location.pathname.split("/");
  const [state, setState] = useState({
    detail: {},
    isLoading: true,
  });
  const [formValues, setFormValues] = useState(state.detail);
  useEffect(() => {
    switch (info[1]) {
      case "edit":
      case "detail":
        const collection = info[2];
        const uid = info[3];
        return dbstore.collection(collection).doc(uid).get().then((doc) => {
          const station = doc.data();
          setState((s) => ({ ...s, detail: station, isLoading: station === undefined }));
        })
          .catch((err) => {
            setState((s) => ({ ...s, isLoading: true }));
          });
      case "add":
        return setState((s) => ({ ...s, isLoading: false }));
      default:
        break;
    }
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const time = new Date();

    if (info[1] === "edit") {
      dbstore.collection(info[2])
        .doc(info[3])
        .update({ ...formValues, time })
        .then(() => {
          history.push("/liststation");
        })
        .catch((err) => console.log("TODO "));
    } else {
      dbstore.collection(info[2])
        .add({ ...formValues, time })
        .then(() => {
          history.push("/liststation");
        })
        .catch((err) => console.log("TODO"));
    }
  };
  console.log(formValues);
  if (state.isLoading === true) return <text>UID KHÔNG HỢP LỆ!!!</text>;
  return (
    <>
      <div className="d-flex flex-row">
        <div className="flex-row-fluid ml-lg-8">
          <div className="card card-custom card-stretch">
            <div className="card-header py-3">
              <div className="card-title align-items-start flex-column">
                <h3 className="card-label font-weight-bolder text-dark">Station</h3>
              </div>
              <div className="card-toolbar">
                {info[1] !== "detail" ?
                  <button form='my-form' type="submit" className="btn btn-success mr-2" disabled={info[1] === "detail"}>Save</button>
                  : null}</div>
            </div>
            <form className="form" id='my-form' onSubmit={onSubmitForm}>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">Station ID</label>
                  <div className="col-lg-9 col-xl-6">
                    <input className="form-control form-control-lg form-control-solid" type="text"
                      defaultValue={state.detail.IdStation} onChange={(e) => setFormValues({ ...formValues, IdStation: e.target.value })}
                      placeholder="IdStation" disabled={info[1] === "detail"} />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">Station Name</label>
                  <div className="col-lg-9 col-xl-6">
                    <div className="input-group input-group-lg input-group-solid">
                      <input type="text" className="form-control form-control-lg form-control-solid" name="NameStation"
                        defaultValue={state.detail.NameStation}
                        onChange={(e) =>
                          setFormValues({ ...formValues, NameStation: e.target.value })
                        }
                        placeholder="Name Station"
                        disabled={info[1] === "detail"} />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">Station Type</label>
                  <div className="col-lg-9 col-xl-6">
                    <div className="input-group input-group-lg input-group-solid">

                      <input type="text" className="form-control form-control-lg form-control-solid" name="TypeStation"
                        defaultValue={state.detail.TypeStation}
                        onChange={(e) =>
                          setFormValues({ ...formValues, TypeStation: e.target.value })
                        }
                        placeholder="Type Station"
                        disabled={info[1] === "detail"} />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">Lat</label>
                  <div className="col-lg-9 col-xl-6">
                    <div className="input-group input-group-lg input-group-solid">
                      <input type="number" className="form-control form-control-lg form-control-solid" name="LatStation"
                        defaultValue={state.detail.LatStation}
                        onChange={(e) =>
                          setFormValues({ ...formValues, LatStation: Number.parseFloat(e.target.value) })
                        }
                        placeholder="LatStation"
                        disabled={info[1] === "detail"} />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">Lng</label>
                  <div className="col-lg-9 col-xl-6">
                    <div className="input-group input-group-lg input-group-solid">
                      <input type="number" className="form-control form-control-lg form-control-solid" name="LngStation"
                        defaultValue={state.detail.LngStation}
                        onChange={(e) =>
                          setFormValues({ ...formValues, LngStation: Number.parseFloat(e.target.value) })
                        }
                        placeholder="LngStation"
                        disabled={info[1] === "detail"} />
                    </div>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};
