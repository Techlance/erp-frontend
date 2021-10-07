import React from "react";

// material-ui
import DeleteIcon from "@material-ui/icons/Delete";

import {
  Button,
  FormControl,
  FormHelperText,
  makeStyles,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";

//-----------------------|| Billwise List ||-----------------------//

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  helperText: {
    position: "absolute",
    bottom: 0,
    left: "20px",
  },
});

const AmountRegex = new RegExp("^([0-9]*[.])?[0-9]*$");

const AddBillTable = ({
  fcName,
  base_currency,
  billwise,
  setBillwise,
  deleteBill,
  addShortcut,
}) => {
  const classes = useStyles();
  return (
    <Table size="medium">
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h4">Ref. No.</Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Credit/Debit
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Bill Date
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Due Date
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Amount
            </Typography>
          </TableCell>
          {fcName && fcName?.id !== base_currency && (
            <TableCell>
              <Typography align="center" variant="h4">
                FC Amount
              </Typography>
            </TableCell>
          )}
          <TableCell>
            <Typography align="center" variant="h4">
              Delete
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {billwise?.map((row, index) => (
          <TableRow hover key={index}>
            <TableCell>
              <TextField
                onKeyPress={addShortcut}
                fullWidth
                id="ref_no"
                label="Reference No."
                value={row?.ref_no}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  setBillwise(index, e);
                }}
              />
            </TableCell>

            <TableCell>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="is_cr"
                  select
                  fullWidth
                  label="Type"
                  value={row?.is_cr}
                  onChange={(e) => {
                    setBillwise(index, e);
                  }}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value={true}>Credit</MenuItem>
                  <MenuItem value={false}>Debit</MenuItem>
                </TextField>
              </FormControl>
            </TableCell>
            <TableCell>
              <TextField
                onKeyPress={addShortcut}
                fullWidth
                id="bill_date"
                label="Bill Date"
                value={row?.bill_date}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  setBillwise(index, e);
                }}
                type="date"
              />
            </TableCell>

            <TableCell>
              <TextField
                onKeyPress={addShortcut}
                fullWidth
                id="due_date"
                label="Due Date"
                InputProps={{ inputProps: { min: row?.bill_date } }}
                value={row?.due_date}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  setBillwise(index, e);
                }}
                type="date"
              />
            </TableCell>
            <TableCell>
              <TextField
                onKeyPress={addShortcut}
                fullWidth
                id="amt"
                label="Amount"
                value={row?.amt && Math.abs(row?.amt)}
                InputLabelProps={{ shrink: true }}
                type="number"
                InputProps={{
                  color: AmountRegex.test(row?.amt) ? "primary" : "error",
                }}
                helperText={
                  AmountRegex.test(row?.amt)
                    ? ""
                    : "Amount should be a positive integer."
                }
                error={AmountRegex.test(row?.amt) ? false : true}
                onChange={(e) => {
                  setBillwise(index, e);
                }}
              />
            </TableCell>

            {fcName && fcName?.id !== base_currency && (
              <TableCell className={classes.root}>
                <TextField
                  onKeyPress={addShortcut}
                  fullWidth
                  id="fc_amount"
                  label="FC Amount"
                  value={row?.fc_amount && Math.abs(row?.fc_amount)}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setBillwise(index, e);
                  }}
                  type="number"
                  inputProps={{
                    min: "0",
                  }}
                  aria-describedby="component-error-text"
                />
                <FormHelperText
                  id="component-error-text"
                  className={classes.helperText}
                >{`FC Rate: ${Math.abs(
                  (row?.amt / row?.fc_amount).toFixed(4)
                )}`}</FormHelperText>
              </TableCell>
            )}

            <TableCell align="center">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="text"
                  color="error"
                  aria-label="delete"
                  onClick={async () => {
                    await deleteBill(index);
                  }}
                >
                  <DeleteIcon sx={{ fontSize: "1.3rem" }} />
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AddBillTable;
