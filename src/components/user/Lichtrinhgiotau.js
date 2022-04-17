import React, { useState, useEffect, useCallback } from 'react';
import { compose } from 'recompose';
import { RouteBoard } from '../../Lichtrinhtau/RouteBoard';
import { withAuthorization } from '../Session';
import getWeatherData from './../../utils/weatherApi';
// import TrainTime from './TrainTime';
const Lichtrinhgiotau = () => {
    const [weatherdata, setWeatherData] = useState(null);
    const citys = ['Hà Nội'];
    const [city, setCity] = useState(citys);
    const getData = useCallback(async () => {
        try {
            let data = await getWeatherData(city);
            setWeatherData(data);
        } catch (error) {
            console.log(error.message);
        }
    }, [city])
    useEffect(() => {
        getData();
    }, [getData]);
    return (
        <div>
            <div className="row">
                <div className="col-xl-8" style={{ "height": "600px" }}>
                    <div className="card card-custom gutter-b card-stretch">
                        <iframe className="embed-responsive-item" title="map" src="https://www.google.com/maps/d/embed?mid=11MzFIuiFU5wzRzUfjzuBCGlAIl7yjEW1" width="100%" height="100%" frameBorder="0" style={{ "border": "0" }}></iframe>
                    </div>
                </div>
                <div className="col-xl-4">
                    {weatherdata !== null ? (
                        <div className="card card-custom gutter-b card-stretch">
                            <div className="card-header border-0 pt-5">
                                <div className="card-title">
                                    <div className="card-label">
                                        <div className="font-weight-bolder">Thời tiết hôm nay</div>
                                        <div className="font-size-sm text-muted mt-2"></div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" placeholder="Tên Thành Phố" />
                                    <div className="input-group-append">
                                        <button className="btn btn-light-dark font-weight-bold" type="button" onClick={() => getData()}>Tìm kiếm</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body d-flex flex-column p-0">
                                <div className="flex-grow-1 card-spacer">
                                    <div className="d-flex align-items-center justify-content-between mb-10">
                                        <div className="d-flex align-items-center mr-2">
                                            <div className="symbol symbol-40 symbol-light-primary mr-3 flex-shrink-0">
                                                <div className="symbol-label">
                                                    <span className="svg-icon svg-icon-lg svg-icon-primary">
                                                        <img src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`} alt="imgicon" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <button className="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">{weatherdata.name}</button>
                                                <div className="font-size-sm text-muted font-weight-bold mt-1">{weatherdata.weather[0].description}</div>
                                            </div>
                                        </div>
                                        <div className="label label-light label-inline font-weight-bold text-dark py-4 px-3 font-size-base">{parseFloat(weatherdata.main.temp - 273.15).toFixed(1)}&deg;C</div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-10">
                                        <div className="d-flex align-items-center mr-2">
                                            <div>
                                                <button className="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Wind Speed</button>
                                            </div>
                                        </div>
                                        <div className="label label-light label-inline font-weight-bold text-dark py-4 px-3 font-size-base">{weatherdata.wind.speed} km/s</div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-10">
                                        <div className="d-flex align-items-center mr-2">
                                            <div>
                                                <button className="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Độ ẩm không khí</button>
                                            </div>
                                        </div>
                                        <div className="label label-light label-inline font-weight-bold text-dark py-4 px-3 font-size-base">{weatherdata.main.humidity}%RH</div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-10">
                                        <div className="d-flex align-items-center mr-2">
                                            <div>
                                                <button className="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Nhiệt độ thấp nhất</button>
                                            </div>
                                        </div>
                                        <div className="label label-light label-inline font-weight-bold text-dark py-4 px-3 font-size-base">{parseFloat(weatherdata.main.temp_min - 273.15).toFixed(1)}&deg;C </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-10">
                                        <div className="d-flex align-items-center mr-2">
                                            <div>
                                                <button className="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder">Nhiệt độ cao nhất</button>
                                            </div>
                                        </div>
                                        <div className="label label-light label-inline font-weight-bold text-dark py-4 px-3 font-size-base">{parseFloat(weatherdata.main.temp_max - 262.15).toFixed(1)}&deg;C </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div >
            <div className="row">
                <div className="col-xl-12">
                    {/* <TrainTime></TrainTime> */}
                    <RouteBoard />
                </div>
            </div>
        </div>
    );
}
const condition = authUser => !!authUser;
export default compose(withAuthorization(condition))(Lichtrinhgiotau);
