import { Link } from 'react-router-dom';
const HomePageAdmin = () => {
    return (
        <div className="row">
            <div className="col-lg-6 col-xxl-7">
                <div className="card card-custom bg-gray-100 card-stretch gutter-b">
                    <div className="card-header border-0 bg-danger py-5">
                        <h3 className="card-title font-weight-bolder text-white">Admin</h3>
                    </div>
                    <div className="card-body p-0 position-relative overflow-hidden">
                        <div id="kt_mixed_widget_1_chart" className="card-rounded-bottom bg-danger" style={{ "height": "200px" }}>

                        </div>
                        <div className="card-spacer mt-n25">
                            <div className="row m-0">
                                <div className="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
                                    <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <rect fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16" rx="1.5" />
                                                <rect fill="#000000" x="8" y="9" width="3" height="11" rx="1.5" />
                                                <rect fill="#000000" x="18" y="11" width="3" height="9" rx="1.5" />
                                                <rect fill="#000000" x="3" y="13" width="3" height="7" rx="1.5" />
                                            </g>
                                        </svg>
                                    </span>
                                    <Link to="#" className="text-warning font-weight-bold font-size-h6 mt-2">Week Starter</Link>
                                </div>
                                <div className="col bg-light-primary px-6 py-8 rounded-xl mb-7">
                                    <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                <path d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                                <path d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fillRule="nonzero" />
                                            </g>
                                        </svg>
                                    </span>
                                    <Link to="/user" className="text-primary font-weight-bold font-size-h6 mt-2">New Users</Link>
                                </div>
                            </div>
                            <div className="row m-0">
                                <div className="col bg-light-danger px-6 py-8 rounded-xl mr-7">
                                    <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="#000000" fillRule="nonzero" />
                                                <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="#000000" opacity="0.3" />
                                            </g>
                                        </svg>
                                    </span>
                                    <Link to="/addvoucher" className="text-danger font-weight-bold font-size-h6 mt-2" >Add Voucher</Link>
                                </div>
                                <div className="col bg-light-success px-6 py-8 rounded-xl">
                                    <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <path d="M12.7037037,14 L15.6666667,10 L13.4444444,10 L13.4444444,6 L9,12 L11.2222222,12 L11.2222222,14 L6,14 C5.44771525,14 5,13.5522847 5,13 L5,3 C5,2.44771525 5.44771525,2 6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,13 C19,13.5522847 18.5522847,14 18,14 L12.7037037,14 Z" fill="#000000" opacity="0.3" />
                                                <path d="M9.80428954,10.9142091 L9,12 L11.2222222,12 L11.2222222,16 L15.6666667,10 L15.4615385,10 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 L9.80428954,10.9142091 Z" fill="#000000" />
                                            </g>
                                        </svg>
                                    </span>
                                    <Link to="/listproblem" cclassName="text-success font-weight-bold font-size-h6 mt-2">Issue Reports</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-xxl-5">
                <div className="card card-custom card-stretch card-stretch-half gutter-b">
                    <div className="card-body p-0">
                        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
                            <span className="symbol symbol-50 symbol-light-success mr-2">
                                <span className="symbol-label">
                                    <span className="svg-icon svg-icon-xl svg-icon-success">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <rect x="0" y="0" width="24" height="24" />
                                                <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5" />
                                                <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
                                            </g>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            <div className="d-flex flex-column text-right">
                                <span className="text-dark-75 font-weight-bolder font-size-h3">750</span>
                                <span className="text-muted font-weight-bold mt-2">Weekly Income</span>
                            </div>
                        </div>
                        <div id="kt_stats_widget_11_chart" className="card-rounded-bottom" data-color="success" style={{ "height": "150px" }}></div>
                    </div>
                </div>
                <div className="card card-custom card-stretch card-stretch-half gutter-b">
                    <div className="card-body p-0">
                        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
                            <span className="symbol symbol-50 symbol-light-primary mr-2">
                                <span className="symbol-label">
                                    <span className="svg-icon svg-icon-xl svg-icon-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <polygon points="0 0 24 0 24 24 0 24" />
                                                <path d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                                <path d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fillRule="nonzero" />
                                            </g>
                                        </svg>
                                    </span>
                                </span>
                            </span>
                            <div className="d-flex flex-column text-right">
                                <span className="text-dark-75 font-weight-bolder font-size-h3">10</span>
                                <span className="text-muted font-weight-bold mt-2">New Users</span>
                            </div>
                        </div>
                        <div id="kt_stats_widget_12_chart" className="card-rounded-bottom" data-color="primary" style={{ "height": "150px" }}></div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-xxl-12">
                <div className="card card-custom">
                    <div className="card-header flex-wrap border-0 pt-6 pb-0">
                        <div className="card-title">
                            <h3 className="card-label">Train Time Information Table
                                <span className="d-block text-muted pt-2 font-size-sm">Support Admin</span></h3>
                        </div>
                        <div className="card-toolbar">
                            <a href="!#" className="btn btn-light-danger font-weight-bold mr-2">
                                <span className="svg-icon svg-icon-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <rect x="0" y="0" width="24" height="24" />
                                            <circle fill="#000000" cx="9" cy="15" r="6" />
                                            <path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3" />
                                        </g>
                                    </svg>
                                </span>Notify Issue</a>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-hover mt-10" id="datatable">
                            <thead>
                                <tr>
                                    <th colSpan="1">Train Station Name</th>
                                    <th colSpan="1">KM</th>
                                    <th colSpan="1">SE7</th>
                                    <th colSpan="1">SE5</th>
                                    <th colSpan="1">SE9</th>
                                    <th colSpan="1">SE3</th>
                                    <th colSpan="1">SE1</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>H&agrave; Nội</td>
                                    <td>0</td>
                                    <td><strong>06:00</strong></td>
                                    <td><strong>15:20</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Gi&aacute;p B&aacute;t</td>
                                    <td>4</td>
                                    <td>&nbsp;</td>
                                    <td><strong>15:36</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Phủ L&yacute;</td>
                                    <td>56</td>
                                    <td><strong>07:05</strong></td>
                                    <td><strong>16:30</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Nam Định</td>
                                    <td>87</td>
                                    <td><strong>07:48</strong></td>
                                    <td><strong>17:13</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Ninh B&igrave;nh</td>
                                    <td>115</td>
                                    <td><strong>08:27</strong></td>
                                    <td><strong>17:52</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Bỉm Sơn</td>
                                    <td>141</td>
                                    <td><strong>09:00</strong></td>
                                    <td><strong>18:29</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Thanh Ho&aacute;</td>
                                    <td>175</td>
                                    <td><strong>09:41</strong></td>
                                    <td><strong>19:11</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Minh Kh&ocirc;i</td>
                                    <td>197</td>
                                    <td><strong>10:10</strong></td>
                                    <td><strong>19:40</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Chợ Sy</td>
                                    <td>279</td>
                                    <td><strong>11:42</strong></td>
                                    <td><strong>21:12</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Vinh</td>
                                    <td>319</td>
                                    <td><strong>12:35</strong></td>
                                    <td><strong>22:05</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Y&ecirc;n Trung</td>
                                    <td>340</td>
                                    <td><strong>13:02</strong></td>
                                    <td><strong>22:32</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Hương Phố</td>
                                    <td>387</td>
                                    <td><strong>13:59</strong></td>
                                    <td><strong>23:29</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Đồng L&ecirc;</td>
                                    <td>436</td>
                                    <td><strong>15:07</strong></td>
                                    <td><strong>00:37</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Minh Lệ</td>
                                    <td>482</td>
                                    <td><strong>16:04</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Đồng Hới</td>
                                    <td>522</td>
                                    <td><strong>17:11</strong></td>
                                    <td><strong>02:36</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Mỹ Đức</td>
                                    <td>551</td>
                                    <td><strong>17:48</strong></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Đ&ocirc;ng H&agrave;</td>
                                    <td>622</td>
                                    <td><strong>19:06</strong></td>
                                    <td><strong>04:26</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Huế</td>
                                    <td>688</td>
                                    <td><strong>20:40</strong></td>
                                    <td><strong>06:06</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Đ&agrave; Nẵng</td>
                                    <td>791</td>
                                    <td><strong>23:52</strong></td>
                                    <td><strong>09:28</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Tam Kỳ</td>
                                    <td>865</td>
                                    <td><strong>01:18</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>10:53</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>N&uacute;i Th&agrave;nh</td>
                                    <td>890</td>
                                    <td>&nbsp;</td>
                                    <td><strong>11:24</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Quảng Ng&atilde;i</td>
                                    <td>928</td>
                                    <td><strong>02:39</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>12:35</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Đức Phổ</td>
                                    <td>968</td>
                                    <td>&nbsp;</td>
                                    <td><strong>13:24</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Bồng Sơn</td>
                                    <td>1017</td>
                                    <td>&nbsp;</td>
                                    <td><strong>14:21</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Di&ecirc;u Tr&igrave;</td>
                                    <td>1096</td>
                                    <td><strong>06:35</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>16:05</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Tuy Ho&agrave;</td>
                                    <td>1198</td>
                                    <td><strong>08:27</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>18:12</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Gi&atilde;</td>
                                    <td>1254</td>
                                    <td>&nbsp;</td>
                                    <td><strong>19:29</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Ninh Ho&agrave;</td>
                                    <td>1281</td>
                                    <td><strong>10:10</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>20:03</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Nha Trang</td>
                                    <td>1315</td>
                                    <td><strong>10:54</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>20:47</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Th&aacute;p Ch&agrave;m</td>
                                    <td>1408</td>
                                    <td><strong>12:53</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>22:47</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>S&ocirc;ng Mao</td>
                                    <td>1484</td>
                                    <td>&nbsp;</td>
                                    <td><strong>00:52</strong>&nbsp;<small>(ng&agrave;y +2)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>B&igrave;nh Thuận</td>
                                    <td>1551</td>
                                    <td><strong>15:36</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>02:03</strong>&nbsp;<small>(ng&agrave;y +2)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Suối Kiết</td>
                                    <td>1603</td>
                                    <td><strong>16:41</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Long Kh&aacute;nh</td>
                                    <td>1649</td>
                                    <td><strong>17:53</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Bi&ecirc;n H&ograve;a</td>
                                    <td>1697</td>
                                    <td><strong>19:01</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>04:58</strong>&nbsp;<small>(ng&agrave;y +2)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>Dĩ An</td>
                                    <td>1707</td>
                                    <td><strong>19:18</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>05:13</strong>&nbsp;<small>(ng&agrave;y +2)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>S&agrave;i G&ograve;n</td>
                                    <td>1726</td>
                                    <td><strong>20:02</strong>&nbsp;<small>(ng&agrave;y +1)</small></td>
                                    <td><strong>05:50</strong>&nbsp;<small>(ng&agrave;y +2)</small></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePageAdmin