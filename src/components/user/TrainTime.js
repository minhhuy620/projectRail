import React, { Component } from 'react';

class TrainTime extends Component {
    render() {
        return (
            <div >
                <div className="alert alert-custom alert-white alert-shadow gutter-b" role="alert">
                    <div className="alert-icon">
                        <span className="svg-icon svg-icon-primary svg-icon-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <rect x="0" y="0" width="24" height="24" />
                                    <path d="M7.07744993,12.3040451 C7.72444571,13.0716094 8.54044565,13.6920474 9.46808594,14.1079953 L5,23 L4.5,18 L7.07744993,12.3040451 Z M14.5865511,14.2597864 C15.5319561,13.9019016 16.375416,13.3366121 17.0614026,12.6194459 L19.5,18 L19,23 L14.5865511,14.2597864 Z M12,3.55271368e-14 C12.8284271,3.53749572e-14 13.5,0.671572875 13.5,1.5 L13.5,4 L10.5,4 L10.5,1.5 C10.5,0.671572875 11.1715729,3.56793164e-14 12,3.55271368e-14 Z" fill="#000000" opacity="0.3" />
                                    <path d="M12,10 C13.1045695,10 14,9.1045695 14,8 C14,6.8954305 13.1045695,6 12,6 C10.8954305,6 10,6.8954305 10,8 C10,9.1045695 10.8954305,10 12,10 Z M12,13 C9.23857625,13 7,10.7614237 7,8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,10.7614237 14.7614237,13 12,13 Z" fill="#000000" fillRule="nonzero" />
                                </g>
                            </svg>
                        </span>
                    </div>
                    <div className="alert-text">
                        <h4>Bảng giờ tàu Ga Đà Nẵng </h4>
                        <a className="font-weight-bold" href="https://vetau.alltours.vn/ga-tau/bang-gio-tau-ga-da-nang.html">Chi tiết</a>
                    </div>
                </div>
                <div className="card card-custom">
                    <div className="card-header flex-wrap border-0 pt-6 pb-0">
                        <div className="card-title">
                            <h3 className="card-label">Bảng giờ tàu Ga Đà Nẵng đi các ga phía Bắc của tàu SE2, SE4, SE6, SE8 và SE10
                                <span className="d-block text-muted pt-2 font-size-sm">Bảng giờ tàu Ga Đà Nẵng đi các ga phía Bắc</span></h3>
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
                                        <div className="col-md-4 my-2 my-md-0">
                                            <div className="d-flex align-items-center">
                                                <label className="mr-3 mb-0 d-none d-md-block">Tên Ga:</label>
                                                <select className="form-control" id="kt_datatable_search_status">
                                                    <option value="">All</option>
                                                    <option value="Hà Nội">Hà Nội</option>
                                                    <option value="Hà Nội">Đà Nẵng</option>
                                                    <option value="Hà Nội">Sài Gòn</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4 my-2 my-md-0">
                                            <div className="d-flex align-items-center">
                                                <label className="mr-3 mb-0 d-none d-md-block">Giờ:</label>
                                                <select className="form-control" id="kt_datatable_search_type">
                                                    <option value="">All</option>
                                                    <option value="1">6:00</option>
                                                    <option value="2">7:00</option>
                                                    <option value="3">8:00</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-4 mt-5 mt-lg-0">
                                    <a href="!#" className="btn btn-light-primary px-6 font-weight-bold">Search</a>
                                </div>
                            </div>
                        </div>
                        <table className="datatable datatable-bordered datatable-head-custom" id="kt_datatable">
                            <thead>
                                <tr>
                                    <th title="Field #1">Tên Ga</th>
                                    <th title="Field #2">KM</th>
                                    <th title="Field #3">SE7</th>
                                    <th title="Field #4">SE5</th>
                                    <th title="Field #5">SE9</th>
                                    <th title="Field #6">SE3</th>
                                    <th title="Field #7">SE1</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hà Nội</td>
                                    <td>5</td>
                                    <td>6:00</td>
                                    <td>15:20</td>
                                    <td>X</td>
                                    <td>19:25</td>
                                    <td>21:30</td>
                                </tr>
                                <tr>
                                    <td>Giáp Bát</td>
                                    <td>20</td>
                                    <td>07:00</td>
                                    <td>15:20</td>
                                    <td>X</td>
                                    <td>19:25</td>
                                    <td>21:30</td>
                                </tr>
                                <tr>
                                    <td>Phủ Lý</td>
                                    <td>117</td>
                                    <td>08:00</td>
                                    <td>15:20</td>
                                    <td>X</td>
                                    <td>19:25</td>
                                    <td>21:30</td>
                                </tr>
                                <tr>
                                    <td>Phủ Lý</td>
                                    <td>117</td>
                                    <td>08:00</td>
                                    <td>15:20</td>
                                    <td>X</td>
                                    <td>19:25</td>
                                    <td>21:30</td>
                                </tr>
                                <tr>
                                    <td>Phủ Lý</td>
                                    <td>117</td>
                                    <td>08:00</td>
                                    <td>15:20</td>
                                    <td>X</td>
                                    <td>19:25</td>
                                    <td>21:30</td>
                                </tr>
                            </tbody>
                        </table>
                    
                    </div>
                </div>   
            </div>
        );
    }
}
export default TrainTime