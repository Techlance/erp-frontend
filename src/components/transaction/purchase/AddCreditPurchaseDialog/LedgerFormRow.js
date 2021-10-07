import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import { Box, Table, TableBody, TableCell, TableHead, Typography, TableRow, Collapse, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
  root:{
    width:"50px",
    border:"1px solid #eeeeee"
  },
  border:{
    border:"1px solid #eeeeee"
  }
})

const LedgerFormRow = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyle();
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"> {row.ledger_code} </TableCell>
        <TableCell align="left">{row.account}</TableCell>
        <TableCell align="left">{row.amount}</TableCell>
        <TableCell align="left">{row.fc_amount}</TableCell>
        <TableCell align="left">{(row.fc_amount/row.amount).toFixed(2)}</TableCell>
        <TableCell align="left">{row.remarks}</TableCell>
        <TableCell align="left">{row.current_balance}</TableCell>
        <TableCell align="left">{row.current_balance}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginLeft: 2 }} tabindex={0}>
              <Table  aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Cost Category</TableCell>
                    <TableCell align="center">Cost Centre</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.cost_category.map((cc_row) => (
                    <>
                    <TableRow key={cc_row.name}>
                      <TableCell className={classes.border} component="th" align="center" scope="row" rowSpan={cc_row.cost_centers.length+1}>
                        {cc_row.name}
                      </TableCell>
                      {cc_row.cost_centers[0]?
                      (
                        <>
                          <TableCell align="center">{cc_row.cost_centers[0].name}</TableCell>
                          <TableCell align="center">{cc_row.cost_centers[0].amount}</TableCell>
                          <TableCell align="center"><IconButton><DeleteOutlineTwoToneIcon color="error"/></IconButton> </TableCell>
                        </>
                      )
                      :<TableCell colSpan={3}><Button fullWidth variant="outlined" size="large">Add Cost Center</Button></TableCell>
                    }
                      <TableCell className={classes.root} component="th" align="center" scope="row" rowSpan={cc_row.cost_centers.length+1}>
                        <IconButton><DeleteOutlineTwoToneIcon color="error"/></IconButton>
                      </TableCell>
                    </TableRow>
                    {cc_row.cost_centers.map((center,index)=>(
                      index!==0 && 
                      <TableRow>
                        <TableCell align="center">{center.name}</TableCell>
                        <TableCell align="center">{center.amount}</TableCell>
                        <TableCell align="center"><IconButton><DeleteOutlineTwoToneIcon color="error"/></IconButton> </TableCell>
                      </TableRow>
                    ))}
                    {cc_row.cost_centers.length!==0 && 
                      <TableCell colSpan={3}><Button fullWidth variant="outlined" size="large">Add Cost Center</Button></TableCell>
                    }
                    </>
                  ))}
                  <TableRow>
                  <TableCell colSpan={5}><Button fullWidth variant="outlined" size="large">Add Cost Category</Button></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default LedgerFormRow