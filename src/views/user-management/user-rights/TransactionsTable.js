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

// assets
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const TransactionsTable = ({ value }) => {
  const [getTransactionsByID, , , data] = useRequest({
    url: `/user/get-user-right/${value}`,
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
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item>
        <pre>{JSON.stringify(transactions, null, 2)}</pre>
      </Grid>
      <Grid item xs={10}>
        {data?.length ? (
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
                    Update
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h4" align="center">
                    Delete
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((transaction, idx) => (
                <TableRow hover key={transaction.transaction_id.id}>
                  <TableCell>
                    <Typography variant="h4">
                      <pre>{JSON.stringify(transaction, null, 2)}</pre>
                      {transaction.transaction_id.transactions}{" "}
                      {transaction.transaction_id.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      variant="text"
                      color="primary"
                      aria-label="more-details"
                      // onClick={(row) => handleCompanyClick(row.company_id)}
                    >
                      <CheckCircleIcon
                        color="success"
                        sx={{ fontSize: "2rem", color: "success.main" }}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      variant="text"
                      color="primary"
                      aria-label="more-details"
                      // onClick={(row) => handleCompanyClick(row.company_id)}
                    >
                      <CheckCircleIcon
                        color="success"
                        sx={{ fontSize: "2rem", color: "success.main" }}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      variant="text"
                      aria-label="more-details"
                      // onClick={(row) => handleCompanyClick(row.company_id)}
                    >
                      <CancelIcon color="error" sx={{ fontSize: "2rem" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      variant="text"
                      color="primary"
                      aria-label="more-details"
                      // onClick={(row) => handleCompanyClick(row.company_id)}
                    >
                      <CancelIcon color="error" sx={{ fontSize: "2rem" }} />
                    </IconButton>
                  </TableCell>
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
