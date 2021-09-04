import React, { useState } from "react";
import { PropTypes } from "prop-types";

//  material-ui
import { Box, Grid, Tab, Tabs, TextField, Typography } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payments-tabpanel-${index}`}
      aria-labelledby={`payments-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const PaymentTypeTabs = ({ values, editable, onChange }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      onChange({
        target: {
          id: "transaction_no",
          value: "",
        },
      });
      onChange({
        target: {
          id: "transaction_date",
          value: null,
        },
      });
    } else if (newValue === 1) {
      onChange({
        target: {
          id: "chq_no",
          value: null,
        },
      });
      onChange({
        target: {
          id: "chq_date",
          value: null,
        },
      });
    }

    setTabValue(newValue);
  };

  if (editable) {
    console.log(editable && values.chq_no);
    console.log(editable && !!values.transaction_no);
  }

  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
      >
        {editable && !!values.chq_no && <Tab label="Cheque" />}
        {editable && !!values.transaction_no && <Tab label="Online Transfer" />}
      </Tabs>

      {editable && !!values.chq_no && (
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                id="chq_no"
                label="Cheque Number"
                InputLabelProps={{ shrink: true }}
                onChange={onChange}
                value={values.chq_no}
                type="text"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                id="chq_date"
                label="Cheque Date"
                InputLabelProps={{ shrink: true }}
                value={values.chq_date}
                onChange={onChange}
                type="date"
              />
            </Grid>
          </Grid>
        </TabPanel>
      )}
      {editable && !!values.transaction_no && (
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                id="transaction_no"
                label="Transaction Number"
                InputLabelProps={{ shrink: true }}
                value={values.transaction_no}
                onChange={onChange}
                type="text"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                id="transaction_date"
                label="Transaction Date"
                InputLabelProps={{ shrink: true }}
                value={values.transaction_date}
                onChange={onChange}
                type="date"
              />
            </Grid>
          </Grid>
        </TabPanel>
      )}
    </>
  );
};

export default PaymentTypeTabs;
