import React, { useEffect, useState } from "react";
import { dbstore } from "../components/Firebase/firebase";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Typography,
  TableSortLabel,
} from '@material-ui/core';
import TrainIcon from '@material-ui/icons/Train';
const useStyles = makeStyles(theme => ({
  tableContainer: {
    padding: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
    '& thead th': {
      fontSize: '1em',
      fontWeight: '700',
      color: theme.palette.primary.white,
      backgroundColor: "#8950FC",
    },
    '& tbody td': {
      fontSize: '1.2em',
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#EEE5FF',
      cursor: 'pointer',
    },
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  avatar: {
    color: "#8950FC"
  },
  name: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: theme.palette.secondary.dark
  },
  train: {
    fontSize: '1em',
  },
  time: {
    fontSize: '1em',
  },
  date: {
    fontSize: '1em',
  },
  margin: {

    margin: theme.spacing(1),
  },
  Button: {
    float: 'right',
  }
}));
export const DetailRoute = (idroute) => {
  const [state, setState] = useState({ Route: [] });
  const pages = [5, 10, 15, { label: 'All', value: -1 }];
  const [page] = useState(0);
  const [rowsPerPage] = useState(pages[page]);
  const [search] = useState("");
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    setFiltered(
      state.Route.filter((info) =>
        info.IdRoute.toLowerCase().includes(search.toLowerCase()),
      )
    );
  }, [search, state.Route]);
  const classes = useStyles();
  useEffect(() => {
    let fdata = [];
    dbstore.collection("Route")
      .where("IdRoute", "==", idroute.match.params.id)
      .onSnapshot((res) => {
        res.docChanges().forEach((change) => {
          const doc = { ...change.doc.data(), id: change.doc.id };
          console.log(doc);
          // console.log(doc.Station.Departure.NameStation)
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
        setState((s) => ({ ...s, Route: fdata }));
      });
  }, []);

  return (
    <>
     <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>
                <TableSortLabel>
                  ID Route
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Train</TableCell>
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>Departure Time</TableCell>
              <TableCell className={classes.tableHeaderCell}>Destination Time</TableCell>
              <TableCell className={classes.tableHeaderCell}>Departure</TableCell>
              <TableCell className={classes.tableHeaderCell}>Destination</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((items,index) => {
                return (
                  <TableRow key={items.id + index + "Route"}>
                    <TableCell className={classes.name}>
                      <Grid container>
                        <Grid items lg={2}>
                          <TrainIcon className={classes.avatar}></TrainIcon>
                        </Grid>
                        <Grid items lg={10}>
                          <Typography className={classes.name}>{items.IdRoute}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell >
                      <Typography color="primary" className={classes.time}>{items.Train.NameTrain}</Typography>
                      {/* <Typography className={classes.date} >{thongbao.Dates}</Typography> */}
                    </TableCell>
                    <TableCell >
                      <Typography color="primary" className={classes.time}>{new Date(items.Date.seconds * 1000).toLocaleDateString()}</Typography>
                      {/* <Typography className={classes.date} >{thongbao.Dates}</Typography> */}
                    </TableCell>
                    <TableCell >
                      <Typography color="primary" className={classes.time}>{new Date(items.DepartureTime * 1000).toLocaleTimeString()}</Typography>
                      {/* <Typography className={classes.date} >{thongbao.Dates}</Typography> */}
                    </TableCell>
                    <TableCell >
                      <Typography color="primary" className={classes.time}>{new Date(items.DestinationTime * 1000).toLocaleTimeString()}</Typography>
                      {/* <Typography className={classes.date} >{thongbao.Dates}</Typography> */}
                    </TableCell>
                    <TableCell >{items.Station.Departure.NameStation}</TableCell>
                    <TableCell >{items.Station.Destination.NameStation}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
    // <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
    //   <div className="d-flex flex-column-fluid">
    //     <div className="container">
    //       <div className="card card-custom">
    //         <div className="card-header flex-wrap py-5">
    //           <div className="card-title">
    //             <h3 className="card-label">List Problem
    //             </h3>
    //           </div>
    //         </div>
    //         <div className="card-body">
    //           <div className="mb-7">
    //             <div className="row align-items-center">
    //               <div className="col-lg-9 col-xl-8">
    //                 <div className="row align-items-center">
    //                   <div className="col-md-4 my-2 my-md-0">
    //                     <div className="input-icon">
    //                       <input type="text" className="form-control" placeholder="Search..." id="kt_datatable_search_query" />
    //                       <span>
    //                         <i className="flaticon2-search-1 text-muted"></i>
    //                       </span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <table className="table table-bordered table-hover table-checkable" >
    //             <thead >
    //               <tr>
    //                 <th>ID Route</th>
    //                 <th>Train</th>
    //                 <th>Date</th>
    //                 <th>Departure Time</th>
    //                 <th>Destination Time</th>
    //                 <th>Departure</th>
    //                 <th>Destination</th>
    //                 <th>Actions</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {state.Route.map((items, index) => (
    //                 <tr key={items.id + index + "Route"}>
    //                   <td>{items.IdRoute}</td>
    //                   <td>{items.Train.NameTrain}</td>
    //                   <td>{new Date(items.Date.seconds * 1000).toLocaleDateString()}</td>
    //                   <td>{new Date(items.DepartureTime * 1000).toLocaleTimeString()}</td>
    //                   <td>{new Date(items.DestinationTime * 1000).toLocaleTimeString()}</td>
    //                   <td>{items.Station.Departure.NameStation}</td>
    //                   <td>{items.Station.Destination.NameStation}</td>
    //                   <td></td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div >
  );
};
