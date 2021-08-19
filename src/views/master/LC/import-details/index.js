import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs, Button, Typography } from "@material-ui/core";

// project imports
import useCompany from "../../../../hooks/useCompany";
import MainCard from "../../../../ui-component/cards/MainCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import AddDocumentDialog from "../../../../components/company/AddDocumentDialog";
import LcForm from "./lcForm";
import CompanyDocumentForm from "../../../company/company-details/CompanyDocumentForm";

// assets
import CloudUploadIcon from "@material-ui/icons/CloudUploadTwoTone";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import DynamicFeedTwoToneIcon from "@material-ui/icons/DynamicFeedTwoTone";
import AddAmendmentDialog from "../../../../components/master/LC/AddAmendmentDialog";

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

//-----------------------|| LC Details ||-----------------------//

const LcDetails = () => {
  const classes = useStyles();
  const { cid } = useParams();

  const { getSelectedCompany } = useCompany();

  useEffect(() => {
    if (!cid) return;
    getSelectedCompany(cid);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  const [value, setValue] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddAmendModal, setShowAddAmendModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard title="LC Details">
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
            label="LC Info"
            icon={<AccountCircleTwoToneIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(0)}
          />
          <Tab
            component={Link}
            to="#"
            label="Documents"
            icon={<DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(1)}
          />
          <Tab
            component={Link}
            to="#"
            label="Amendments"
            icon={<DynamicFeedTwoToneIcon sx={{ fontSize: "1.6rem" }} />}
            {...a11yProps(1)}
          />
          {value === 1 ? (
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
          {value === 2 ? (
            <div style={{ position: "absolute", right: 0 }}>
              <AnimateButton>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => setShowAddAmendModal(true)}
                  startIcon={<CloudUploadIcon />}
                >
                  <Typography>Add Amendment</Typography>
                </Button>
              </AnimateButton>
            </div>
          ) : null}
        </Tabs>
        <TabPanel value={value} index={0}>
          <LcForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CompanyDocumentForm />
        </TabPanel>
      </div>
      <AddDocumentDialog
        open={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
      <AddAmendmentDialog
        open={showAddAmendModal}
        handleClose={() => setShowAddAmendModal(false)}
      />
    </MainCard>
  );
};

export default LcDetails;
