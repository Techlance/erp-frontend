import React, { useEffect } from "react";

// material ui
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

// project imports
import useRequest from "../../../hooks/useRequest";
import { gridSpacing } from "../../../store/constant";
import TransactionTabRow from "./TransactionTabRow";

const TransactionsTable = ({ value }) => {
  const [getTransactionsByID, , , data] = useRequest({
    url: `/user/get-user-right/${value.id}`,
    // url: "/company/get-transaction-right",
    initialState: [],
  });

  const [getTransactions, , , transactions] = useRequest({
    // url: `/user/get-user-right/${value}`,
    url: "/company/get-transaction-right",
    initialState: [],
  });

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
      <Grid>
        {/* <pre>{JSON.stringify({ transactions, data }, null, 2)}</pre> */}
      </Grid>

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
                transactions.map((transaction) => (
                  <TableRow hover key={transaction.id}>
                    <TransactionTabRow
                      data={data.find(
                        (item) => item.transaction_id.id === transaction.id
                      )}
                      transaction_id={transaction}
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default TransactionsTable;

// <pre>
//  {JSON.stringify(
//    data.find(
//      (item) => item.transaction_id.id === transaction.id
//    ),
//    null,
//    2
//  )}
// </pre>
