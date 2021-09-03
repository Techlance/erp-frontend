import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs } from "@material-ui/core";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";

// assets
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { useSelector } from "react-redux";
import useBudget from "../../../../hooks/useBudget";
import CashFlowGrid from "./CashFlowGrid";

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

//-----------------------|| Company Details ||-----------------------//

const BudgetPlDetails = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [edited, setEdited] = useState([]);
  const [revised, setRevised] = useState([]);

  const {
    getBudgetCashFlowDetails,
    updateBudgetCashflowDetails,
    getBudgetCashflowRevise,
    updateBudgetCashflowRevise,
  } = useBudget();

  const { company_budget_cashflow_details, company_budget_cashflow_revise } =
    useSelector((state) => state.budget);

  const { bid } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!company_budget_cashflow_details) getBudgetCashFlowDetails(bid);
    if (!company_budget_cashflow_revise) getBudgetCashflowRevise(bid);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_budget_cashflow_details, bid]);

  const onSuccess = async () => {
    setEdited([]);
    await getBudgetCashFlowDetails(bid);
  };

  const onSuccessRevise = async () => {
    setRevised([]);
    await getBudgetCashFlowDetails(bid);
  };

  const handleUpdate = async () => {
    let form = {
      changed_budget_details: edited,
    };
    await updateBudgetCashflowDetails(bid, form, onSuccess);
  };

  const handleRevise = async () => {
    let form = {
      changed_budget_details: revised,
    };
    await updateBudgetCashflowRevise(bid, form, onSuccessRevise);
  };

  return (
    <MainCard title="Cash Flow Details">
      <div className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          className={classes.accountTab}
          aria-label="cash-flow-tabs"
          variant="scrollable"
        >
          <Tab
            component={Link}
            to="#"
            label="Budget"
            icon={<MenuBookIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(0)}
          />
          <Tab
            component={Link}
            to="#"
            label="Revised"
            icon={<AccountBalanceWalletIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <CashFlowGrid
            rows={company_budget_cashflow_details}
            handleUpdate={handleUpdate}
            edited={edited}
            setEdited={setEdited}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CashFlowGrid
            rows={company_budget_cashflow_revise}
            handleUpdate={handleRevise}
            edited={edited}
            setEdited={setEdited}
          />
        </TabPanel>
      </div>
    </MainCard>
  );
};

export default BudgetPlDetails;
