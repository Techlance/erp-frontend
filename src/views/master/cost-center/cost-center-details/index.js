import React, { useState } from "react";
import { Link } from "react-router-dom";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs } from "@material-ui/core";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";

// assets
import CostCenterForm from "./CostCenterForm";

// style constant
const useStyles = makeStyles((theme) => ({
  accountTab: {
    "marginBottom": "24px",
    "& a": {
      minHeight: "auto",
      minWidth: "10px",
      padding: "12px 8px",
      marginRight: "18px",
      color: theme.palette.grey[600],
    },
    "& a.Mui-selected": {
      color: theme.palette.primary.main,
    },
    "& a > span": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    "& a > span > svg": {
      marginBottom: "0px !important",
      marginRight: "10px",
    },
    "& a > span > span + svg": {
      margin: "0px 0px 0px auto !important",
      width: "14px",
      height: "14px",
    },
  },
}));

// tabs
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
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    "id": `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//-----------------------|| Cost Center Details ||-----------------------//

const CostCenterDetails = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard title="Cost Center Details">
      <div className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          className={classes.accountTab}
          aria-label="simple tabs example"
          variant="scrollable"
        >
          <Tab
            component={Link}
            to="#"
            label="Center Details"
            icon={<AccountCircleTwoToneIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(0)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <CostCenterForm />
        </TabPanel>
      </div>
    </MainCard>
  );
};

export default CostCenterDetails;
