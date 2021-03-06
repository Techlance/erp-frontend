import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs, Button, Typography } from "@material-ui/core";

// project imports
import useAuth from "../../../../hooks/useAuth";
import useBudget from "../../../../hooks/useBudget";
import CashFlowGrid from "./CashFlowGrid";

// assets
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import MainCard from "../../../../ui-component/cards/MainCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import AddIcon from "@material-ui/icons/AddCircleTwoTone";

// style constant
const useStyles = makeStyles((theme) => ({
  accountTab: {
    marginBottom: "24px",
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//-----------------------|| Company Details ||-----------------------//

const BudgetPlDetails = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const { mid, bid } = useParams();

  const [values, setValues] = useState([]);
  const [count, setCount] = useState(-1);
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

  const handleChange = (event, newValue) => {
    if (newValue === 0) getBudgetCashFlowDetails(bid);
    else getBudgetCashflowRevise(bid);
    setValue(newValue);
  };

  const addRow = () => {
    setValues([
      ...values,
      {
        id: count,
        budget_type: null,
        cashflow_head: null,
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        octo: 0,
        nov: 0,
        dec: 0,
        created_by: user.email,
      },
    ]);
    setEdited([
      ...edited,
      {
        id: count,
        budget_type: null,
        cashflow_head: null,
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        octo: 0,
        nov: 0,
        dec: 0,
        created_by: user.email,
      },
    ]);
    setCount(count - 1);
  };

  useEffect(() => {
    getBudgetCashFlowDetails(bid);
    getBudgetCashflowRevise(bid);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bid]);

  useEffect(() => {
    setValues([...company_budget_cashflow_details]);
  }, [company_budget_cashflow_details]);

  const onSuccess = async () => {
    setEdited([]);
    await getBudgetCashFlowDetails(bid);
  };

  const onSuccessRevise = async () => {
    setRevised([]);

    await getBudgetCashflowRevise(bid);
  };

  const handleUpdate = async () => {
    let editCopy = [...edited].map((ed) => {
      if (ed.id < 0) {
        delete ed.id;
      }
      ed.budget_id = bid;
      ed.company_master_id = mid;
      ed.cashflow_head = ed.cashflow_head?.id;
      return ed;
    });

    let form = {
      company_master_id: parseInt(mid),
      changed_budget_details: editCopy,
    };

    await updateBudgetCashflowDetails(form, onSuccess);
  };

  const handleRevise = async () => {
    let form = {
      company_master_id: parseInt(mid),
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
          {value === 0 ? (
            <div style={{ position: "absolute", right: 0 }}>
              <AnimateButton>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={addRow}
                  startIcon={<AddIcon />}
                >
                  <Typography>Add Row</Typography>
                </Button>
              </AnimateButton>
            </div>
          ) : null}
          <Tab
            component={Link}
            to="#"
            label="Budget"
            value={0}
            icon={<MenuBookIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(0)}
          />
          <Tab
            component={Link}
            to="#"
            label="Revised"
            value={1}
            icon={<AccountBalanceWalletIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <CashFlowGrid
            rows={values}
            handleUpdate={handleUpdate}
            edited={edited}
            setEdited={setEdited}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CashFlowGrid
            rows={company_budget_cashflow_revise}
            handleUpdate={handleRevise}
            edited={revised}
            setEdited={setRevised}
            revise
          />
        </TabPanel>
      </div>
    </MainCard>
  );
};

export default BudgetPlDetails;
