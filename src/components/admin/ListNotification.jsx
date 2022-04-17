import React, { useState, useEffect } from 'react';
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
  TablePagination,
  TableFooter,
  TableSortLabel,
  Toolbar,
  TextField,
  Box,
} from '@material-ui/core';
import TrainIcon from '@material-ui/icons/Train';
import SearchIcon from '@material-ui/icons/Search';
import { dbstore } from '../Firebase/firebase'
import { Link } from 'react-router-dom';


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

export default function ListNotification() {
  const pages = [5, 10, 15, { label: 'All', value: -1 }];
  const [thongbao, setThongbao] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const fetchData = async () => {
    dbstore.collection('reportProblem').onSnapshot(snapshot => {
      const dataInfo = [];
      let thongbao = snapshot.docChanges();
      thongbao.forEach(change => {
        if (change.type === 'added') {
          dataInfo.push({
            IdRoute: change.doc.data().IdRoute,
            IdStaff: change.doc.data().IdStaff,
            StatusInfo: change.doc.data().StatusInfo,
            TimeDelay: change.doc.data().TimeDelay,
            Date: change.doc.data().Date,
            NameTrain: change.doc.data().NameTrain,
          })
        }
      });
      console.log(dataInfo);
      setThongbao(dataInfo);
    })
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setFiltered(
      thongbao.filter((info) =>
        info.IdRoute.toLowerCase().includes(search.toLowerCase()),
      )
    );
  }, [search, thongbao]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };
  const handleSearch = e => {
    setSearch(e.target.value);
  }
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Toolbar>
          <SearchIcon></SearchIcon>
          <Box flexGrow={1}>
            <TextField
              className={classes.margin}
              label="Search"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleSearch}
            />
          </Box>
          <Box p={1}>
            <button className="btn btn-light-danger font-weight-bold mr-2">
              <span className="svg-icon svg-icon-md">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="9" cy="15" r="6"></circle><path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3"></path></g></svg>
              </span>
              <span>Report Problem</span>
            </button>
          </Box>
        </Toolbar>
        <Table className={classes.table} aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>
                <TableSortLabel>
                  ID Route/ID Staff
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Name Train</TableCell>
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>Time Delay</TableCell>
              <TableCell className={classes.tableHeaderCell}>Status</TableCell>
              <TableCell className={classes.tableHeaderCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                return (
                  <TableRow key={item.reportProblemID}>
                    <TableCell className={classes.name}>
                      <Grid container>
                        <Grid item lg={2}>
                          <TrainIcon className={classes.avatar}></TrainIcon>
                        </Grid>
                        <Grid item lg={10}>
                          <Typography className={classes.name}>{item.IdRoute}</Typography>
                          <Typography color="textSecondary" className={classes.train}>{item.IdStaff}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell >
                      <Typography color="primary" className={classes.time}>{new Date(item.Date.seconds * 1000).toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell >
                      <Typography color="primary" className={classes.time}>{item.NameTrain}</Typography>
                    </TableCell>
                    <TableCell >
                      <Typography color="primary" className={classes.time}>{new Date(item.TimeDelay.seconds * 1000).toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell >{item.StatusInfo}</TableCell>
                    <TableCell >
                      <Link
                        to={`/detailroute/${item.IdRoute}`}
                        className="btn btn-light-info font-weight-bold mr-2"
                      >
                        Detail Route
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <TableFooter>
          <TablePagination
            rowsPerPageOptions={pages}
            component="tr"
            count={thongbao.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}