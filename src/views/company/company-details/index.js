import React, { useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs, Button, Typography } from "@material-ui/core";

// project imports
import useCompany from "../../../hooks/useCompany";
import MainCard from "../../../ui-component/cards/MainCard";
import CompanyForm from "./CompanyForm";
import CompanyDocumentForm from "./CompanyDocumentForm";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import AddDocumentDialog from '../../../components/company/AddDocumentDialog'

// style constant
const useStyles = makeStyles((theme) => ({
  accountTab: {
    "marginBottom": "24px",
    "& button": {
      minWidth: "100px",
    },
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

const CompanyDetails = () => {
  const classes = useStyles();
  const { cid } = useParams();

  const { current_company, current_company_docs, getSelectedCompany } = useCompany();

  useEffect(() => {
    if (!cid) return;
    getSelectedCompany(cid);
  }, [cid]);

  const [value, setValue] = React.useState(0);
  const [showAddModal,setShowAddModal] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard title="Company Details">
      <div className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          className={classes.accountTab}
          aria-label="simple tabs example"
          variant="scrollable"
        >
          <Tab
            component={RouterLink}
            to="#"
            label="Profile"
            {...a11yProps(0)}
          />
          <Tab component={RouterLink} to="#" label="Docs" {...a11yProps(1)} />
          {value===1? 
            <div style={{position:'absolute',right:0}}>      
              <AnimateButton>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => setShowAddModal(true)}
                >
                  <Typography>
                    Upload Document
                  </Typography>
                </Button>
              </AnimateButton>
            </div>
          :null}
        </Tabs>
        <TabPanel value={value} index={0}>
          <CompanyForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CompanyDocumentForm />
        </TabPanel>
      </div>
      <AddDocumentDialog
        open={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
      <pre>{JSON.stringify(current_company, null, 2)}</pre>
      <pre>{JSON.stringify(current_company_docs, null, 2)}</pre>
    </MainCard>
  );
};

export default CompanyDetails;
