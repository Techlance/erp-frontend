import React, { useState } from "react";
import { PropTypes } from "prop-types";

//  material-ui
import { Box, Grid, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function CustomDatePicker({ label }) {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        indicatorColor="primary"
        renderInput={(props) => (
          <TextField fullWidth {...props} helperText="" />
        )}
        label="Date & Time"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        sx={{
          "& .MuiTabs-flexContainer .MuiTabs-indicator": {
            bgcolor: "primary.main",
          },
        }}
      />
    </LocalizationProvider>
  );
}

const PaymentTypeTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
      >
        <Tab label="Cheque" />
        <Tab label="Online Transfer" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              fullWidth
              id="chq_no"
              label="Cheque Number"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              type="text"
            />
          </Grid>
          <Grid item sm={6}>
            <CustomDatePicker label="Cheque Date" />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              fullWidth
              id="chq_no"
              label="Transaction Number"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              type="text"
            />
          </Grid>
          <Grid item sm={6}>
            <CustomDatePicker label="Cheque Date" />
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};

export default PaymentTypeTabs;
