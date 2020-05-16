import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from "@material-ui/core/TableHead";
import Loading from "../components/Loading";

const axios = require('axios').default;

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

class CustomPaginationActionsTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      queries: [],
      page: 0,
      rowsPerPage: 5,
      loading: false
    };
  }

  componentDidMount() {
    this.getQueries();
  }

  async getQueries () {
    try {
      const response = await axios.get('http://localhost:4000/queries', {
        headers: {
          'Content-Type':'application/x-www-form-urlencoded'
        }
      });
      this.setState({queries: response.data});
      this.setState({loading: true})
    } catch (error) {
      console.error(error);
    }
  }

  renderQueries = ({id, userIp, numberFibonacci, valueFibonacci, timeQuery}) => {
    const time = new Date(timeQuery).toLocaleTimeString();
    const data = new Date(timeQuery).toLocaleDateString();

    return (
      <TableRow key={id}>
        <TableCell component="th" scope="row">
          {userIp}
        </TableCell>
        <TableCell style={{ width: 160 }} align="right">
          {numberFibonacci}
        </TableCell>
        <TableCell style={{ width: 160 }} align="right">
          {valueFibonacci}
        </TableCell>
        <TableCell style={{ width: 160 }} align="right">
          {time}
        </TableCell>
        <TableCell style={{ width: 160 }} align="right">
          {data}
        </TableCell>
      </TableRow>
    )
  }

  render() {
    const classes = makeStyles({
      table: {
        minWidth: 500,
      },
    });
    const {loading} = this.state;

    const {queries} = this.state;

    const {page, rowsPerPage} = this.state;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, queries.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
      this.setState({page: newPage});
    };

    const handleChangeRowsPerPage = (event) => {
      this.setState({rowsPerPage: parseInt(event.target.value, 10)});
      this.setState({page: 0});
    };


    return (!loading)? <div className="loading"><Loading /></div> : !queries.length
      ? <h1>There are no requests from your ip yet</h1>
      : (
        <div>
          <h1>All queries from your ip-address</h1>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>User ip-address</TableCell>
                  <TableCell align="right">Fibonacci number</TableCell>
                  <TableCell align="right">Fibonacci value</TableCell>
                  <TableCell align="right">Time query</TableCell>
                  <TableCell align="right">Date query</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                    ? queries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : queries
                ).map(this.renderQueries)}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={queries.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      )
  }
}

export default CustomPaginationActionsTable;
