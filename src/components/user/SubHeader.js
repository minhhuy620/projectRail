import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from '../Session';
class SubHeader extends Component {
	render() {
		return (
			<>
				<div className="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
					<div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
						<div className="d-flex align-items-center flex-wrap mr-2">
							<h5 className="text-dark font-weight-bold mt-2 mb-2 mr-5">WELCOME TO VIETNAM RAILWAY CUSTOMER CARE SYSTEM</h5>
							<div className="subheader-separator subheader-separator-ver mt-2 mb-2 mr-4 bg-gray-200"></div>
						</div>
						<div className="d-flex align-items-center">
							{/*begin::Actions*/}
							{/* <a href="#" className="btn btn-clean btn-sm font-weight-bold font-size-base mr-1">Today</a>
							<a href="#" className="btn btn-clean btn-sm font-weight-bold font-size-base mr-1">Month</a>
							<a href="#" className="btn btn-clean btn-sm font-weight-bold font-size-base mr-1">Year</a> */}
							{/*end::Actions*/}
							{/*begin::Daterange*/}
							<a href="#" className="btn btn-sm btn-light font-weight-bold mr-2" id="kt_dashboard_daterangepicker" data-toggle="tooltip" title="Select dashboard daterange" data-placement="left">
								<span className="text-muted font-size-base font-weight-bold mr-2" id="kt_dashboard_daterangepicker_title">Today</span>
								<span className="text-primary font-size-base font-weight-bolder" id="kt_dashboard_daterangepicker_date">Aug 16</span>
							</a>
							{/*end::Daterange*/}

						</div>
					</div>

				</div>
			</>
		)
	}
}
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition))(SubHeader)