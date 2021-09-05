import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs, Button, Typography } from "@material-ui/core";

// project imports
import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import LedgerForm from "./LedgerForm";
import LedgerBalance from "./LedgerBalance";
import LedgerBillwise from "./LedgerBillwise";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import LedgerDocumentForm from "./LedgerDocumentForm";
import AddDocumentDialog from "../../../../components/master/ledger-master/AddDocumentDialog";

// assets
import CloudUploadIcon from "@material-ui/icons/CloudUploadTwoTone";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import MainCard from "../../../../ui-component/cards/MainCard";
import Loader from "../../../../ui-component/Loader";

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

const LedgerDetails = () => {
  const classes = useStyles();
  const { lid } = useParams();
  const [value, setValue] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  const { getCompanyLedgerDetails } = useLedgerMaster();

  const { company_ledger_details } = useSelector((state) => state.ledgerMaster);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!(company_ledger_details || company_ledger_details?.id === lid))
      getCompanyLedgerDetails(lid);
  }, [company_ledger_details, getCompanyLedgerDetails, lid]);

  if (!company_ledger_details) return <Loader />;

  return (
    <MainCard title="Ledger Details">
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
            label="Ledger"
            icon={<MenuBookIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(0)}
          />
          {company_ledger_details.maintain_billwise && (
            <Tab
              component={Link}
              to="#"
              label="Balances"
              icon={<AccountBalanceWalletIcon sx={{ fontSize: "1.3rem" }} />}
              {...a11yProps(1)}
            />
          )}
          <Tab
            component={Link}
            to="#"
            label="Docs"
            icon={<DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(2)}
          />
          {value === 2 ? (
            <div style={{ position: "absolute", right: 0 }}>
              <AnimateButton>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => setShowAddModal(true)}
                  startIcon={<CloudUploadIcon />}
                >
                  <Typography>Upload Document</Typography>
                </Button>
              </AnimateButton>
            </div>
          ) : null}
        </Tabs>
        <TabPanel value={value} index={0}>
          <LedgerForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {company_ledger_details?.maintain_billwise ? (
            <LedgerBillwise />
          ) : (
            <LedgerBalance />
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <LedgerDocumentForm />
        </TabPanel>
      </div>
      <AddDocumentDialog
        open={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
    </MainCard>
  );
};

export default LedgerDetails;
