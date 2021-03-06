import React, { useEffect, useState } from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "@material-ui/core";

// project imports
import useRequest from "../../../hooks/useRequest";
import { gridSpacing } from "../../../store/constant";
import TransactionTabRow from "./TransactionTableRow";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
  },
}));

const TransactionsTable = ({ value }) => {
  const classes = useStyles();

  const [getTransactionsByID, , , data] = useRequest({
    url: `/user/get-user-right/${value.id}`,
    initialState: [],
  });

  const [getTransactions, , , transactions] = useRequest({
    url: "/company/get-transaction-right",
    initialState: [],
  });

  const [page, setPage] = useState(1);

  // eslint-disable-next-line no-unused-vars
  const [rows, setRows] = useState(5);

  const handlePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getTransactions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTransactionsByID();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Grid container spacing={gridSpacing} justifyContent="center" mt={4}>
      <Grid item xs={10}>
        {transactions?.length && value.id !== 0 ? (
          <Table>
            <TableHead mb={5}>
              <TableRow>
                <TableCell>
                  <Typography variant="h4">Transaction Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h4" align="center">
                    Create
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h4" align="center">
                    Edit
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h4" align="center">
                    View
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h4" align="center">
                    Delete
                  </Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {transactions?.length &&
                transactions.map((transaction, i) => {
                  return i >= (page - 1) * rows &&
                    i < (page - 1) * rows + rows ? (
                    <TableRow hover key={transaction.id}>
                      <TransactionTabRow
                        data={data.find(
                          (item) => item.transaction_id.id === transaction.id
                        )}
                        transaction_id={transaction}
                        user_group_id={value.id}
                      />
                    </TableRow>
                  ) : null;
                })}
            </TableBody>
          </Table>
        ) : null}
      </Grid>

      <Grid item xs={10}>
        {transactions?.length && value.id !== 0 ? (
          <div className={classes.root}>
            <Pagination
              count={Math.ceil(transactions.length / rows)}
              color="primary"
              page={page}
              onChange={handlePagination}
            />
          </div>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default TransactionsTable;
