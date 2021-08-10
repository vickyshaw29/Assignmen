import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Loader from "../../stuff/Loader";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "6em",
  },
  container: {
    maxHeight: 440,
  },
});

const Homepage = ({ history }) => {
  const classes = useStyles();
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState('')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(
          "https://www.breakingbadapi.com/api/characters"
        );
        setData(data);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError('Something went wrong')
      }
    };
    getDetails();
  }, []);

  const columns = [
    { id: "number", label: "Number", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "occupation", label: "Occupation", minWidth: 100 },
    {
      id: "dob",
      label: "DOB",
      minWidth: 170,
      align: "right",
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: "status",
      label: "status",
      minWidth: 170,
      align: "right",
      // format: (value) => value.toLocaleString('en-US'),
    },
  ];

  function createData(number, name, occupation, dob, status) {
    return { number, name, occupation, dob, status };
  }

  const rows = [
    // createData('India', 'IN', 1324171354, 3287263),
  ];
  data &&
    data.map((val) =>
      rows.push(
        createData(
          val.char_id,
          val.name,
          val.occupation[0],
          val.birthday,
          val.status
        )
      )
    );
  return (
    <Paper className={classes.root}>
      {loading && <Loader/>}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => history.push(`/details/${row.number}`)}
                          style={{cursor:'pointer'}}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Homepage;
