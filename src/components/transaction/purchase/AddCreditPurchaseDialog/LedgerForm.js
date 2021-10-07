import React, { useEffect } from "react";

import { Button, Grid, Paper, TableContainer } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import LedgerFormRow from './LedgerFormRow';
import AddIcon from '@material-ui/icons/Add';


// project imports
import useAuth from "../../../../hooks/useAuth";  

const LedgerForm = ({
  handleNext,
  setErrorIndex,
  values,
  setValues
}) => {
  const { user } = useAuth();

  const keydownHandler = (e) => {
    if(e.keyCode===76 && e.ctrlKey){
      e.preventDefault();
      console.log("create ledger")
    }
  }

  useEffect(()=>{
    
    document.addEventListener('keydown',keydownHandler);

    return() =>{
      document.removeEventListener('keydown',keydownHandler);
    }

  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Ledger Code</TableCell>
                <TableCell align="left">Account</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">FC Amount</TableCell>
                <TableCell align="left">FC Rate</TableCell>
                <TableCell align="left">Remarks</TableCell>
                <TableCell align="left">Current Balance</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((row) => (
                <LedgerFormRow key={row.name} row={row} />
              ))}
              <TableRow>
                <TableCell colSpan={9} align="right">
                <Button variant="outlined" startIcon={<AddIcon />}> Add Ledger (Ctrl + L)</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default LedgerForm;
