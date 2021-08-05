import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
  Avatar,
} from "@material-ui/core";

// project imports
import CompanyProfile from "./CompanyProfile";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import { gridSpacing } from "../../../../store/constant";
import useCompany from "../../../../hooks/useCompany";
import useAuth from "../../../../hooks/useAuth";
import formatDate from "../../../../utils/format-date";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";

// assets
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MainCard from "../../../../ui-component/cards/MainCard";
import config from "../../../../config";

// style constant
const useStyles = makeStyles((theme) => ({
  profileTab: {
    "& .MuiTabs-flexContainer": {
      borderBottom: "none",
    },
    "& button": {
      color:
        theme.palette.mode === "dark"
          ? theme.palette.grey[600]
          : theme.palette.grey[600],
      minHeight: "auto",
      minWidth: "100%",
      padding: "12px 16px",
    },
    "& button.Mui-selected": {
      color: theme.palette.primary.main,
      background:
        theme.palette.mode === "dark"
          ? theme.palette.dark.main
          : theme.palette.grey[50],
    },
    "& button > span": {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      textAlign: "left",
      justifyContent: "flex-start",
    },
    "& button > span > svg": {
      marginBottom: "0px !important",
      marginRight: "10px",
      marginTop: "10px",
      height: "20px",
      width: "20px",
    },
    "& button > span > div > span": {
      display: "block",
    },
    "& button > span > span + svg": {
      margin: "0px 0px 0px auto !important",
      width: "14px",
      height: "14px",
    },
    "& > div > span": {
      display: "none",
    },
  },
  cardPanels: {
    borderLeft: "1px solid",
    borderLeftColor: theme.palette.mode === "dark" ? "#333d5e" : "#eeeeee",
    height: "100%",
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
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//-----------------------|| COMPANY PROFILE ||-----------------------//

const CompanyDetails = () => {
  const classes = useStyles();

  const { user } = useAuth();

  const {
    companies,
    current_company,
    getSelectedCompany,
    getSelectedCompanyDocs,
    updateCompany,
    deleteCompany,
  } = useCompany();

  const customization = useSelector((state) => state.customization);
  const [value, setValue] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    getSelectedCompany(newValue);
    getSelectedCompanyDocs(newValue);
  };

  // constants
  const INIT_STATE = {
    id: 0,
    company_name: "",
    base_currency: { id: 0 },
    address: "",
    country: "",
    state: "",
    email: "",
    website: "",
    contact_no: "",
    cr_no: "",
    registration_no: "",
    tax_id_no: "",
    vat_id_no: "",
    year_start_date: "",
    year_end_date: "",
    created_by: user.email,
  };

  const [values, setValues] = useState(() => {
    if (value === 0) {
      return INIT_STATE;
    }

    return {
      id: current_company.id,
      base_currency: current_company.base_currency,
      company_name: current_company.company_name,
      address: current_company.address,
      country: current_company.country,
      state: current_company.state,
      email: current_company.email,
      website: current_company.website,
      contact_no: current_company.contact_no,
      cr_no: current_company.cr_no,
      logo: null,
      registration_no: current_company.registration_no,
      tax_id_no: current_company.tax_id_no,
      vat_id_no: current_company.vat_id_no,
      year_start_date: current_company.year_start_date,
      year_end_date: current_company.year_end_date,
      created_by: current_company.created_by,
    };
  });

  useEffect(() => {
    setValues(() => {
      if (value === 0) {
        return INIT_STATE;
      }

      return {
        id: current_company.id,
        base_currency: current_company.base_currency,
        company_name: current_company.company_name,
        address: current_company.address,
        country: current_company.country,
        state: current_company.state,
        email: current_company.email,
        website: current_company.website,
        contact_no: current_company.contact_no,
        cr_no: current_company.cr_no,
        logo: null,
        registration_no: current_company.registration_no,
        tax_id_no: current_company.tax_id_no,
        vat_id_no: current_company.vat_id_no,
        year_start_date: current_company.year_start_date,
        year_end_date: current_company.year_end_date,
        created_by: current_company.created_by,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_company, value]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="Account Settings" content={false}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={4}>
              <CardContent>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  orientation="vertical"
                  className={classes.profileTab}
                  variant="scrollable"
                  sx={{
                    "& button": {
                      borderRadius: customization.borderRadius + "px",
                    },
                  }}
                >
                  <Tab
                    key={0}
                    icon={<AddCircleIcon fontSize="large" />}
                    label={
                      <Grid container direction="column">
                        <Typography variant="subtitle1" color="inherit">
                          <span style={{ margin: "0 10px" }}>CREATE</span>
                        </Typography>
                        <Typography
                          component="div"
                          variant="caption"
                          sx={{ textTransform: "capitalize" }}
                        >
                          <span style={{ margin: "0 10px" }}>
                            Add A New Company
                          </span>
                        </Typography>
                      </Grid>
                    }
                    {...a11yProps(0)}
                  />
                  {companies.map((tab) => (
                    <Tab
                      key={tab.company_id}
                      value={tab.company_id}
                      icon={
                        <Avatar
                          src={`${config.media_uri}${tab.logo}`}
                          alt={tab.company_name}
                        />
                      }
                      label={
                        <Grid container direction="column">
                          <Typography variant="subtitle1" color="inherit">
                            <span style={{ margin: "0 10px" }}>
                              {tab.company_name}
                            </span>
                          </Typography>
                          <Typography
                            component="div"
                            variant="caption"
                            sx={{ textTransform: "capitalize" }}
                          >
                            <span style={{ margin: "0 10px" }}>
                              {formatDate(tab.created_on)}
                            </span>
                          </Typography>
                        </Grid>
                      }
                      {...a11yProps(tab.company_id)}
                    />
                  ))}
                </Tabs>
              </CardContent>
            </Grid>
            <Grid item xs={12} lg={8}>
              <CardContent className={classes.cardPanels}>
                <TabPanel value={value} index={value}>
                  <CompanyProfile values={values} setValues={setValues} />
                </TabPanel>
              </CardContent>
            </Grid>
          </Grid>
          <Divider />
          <CardActions>
            <Grid container justifyContent="space-between" spacing={0}>
              <Grid item>
                {value >= 0 && (
                  <AnimateButton>
                    <Button variant="outlined" size="large" color="primary">
                      Back
                    </Button>
                  </AnimateButton>
                )}
              </Grid>

              <Grid item>
                <Grid container justifyContent="space-between" spacing={10}>
                  {value !== 0 ? (
                    <Grid item>
                      <AnimateButton>
                        <Button
                          variant="contained"
                          size="large"
                          color="error"
                          onClick={() => setShowDeleteModal(true)}
                        >
                          Delete
                        </Button>
                      </AnimateButton>
                    </Grid>
                  ) : null}
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        // onClick={(e) => handleChange(e, 1 + parseInt(value))}
                        onClick={(e) => {
                          updateCompany(value, values);
                        }}
                      >
                        {value === 0 ? "Create" : "Update"}
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardActions>
          <ConfirmDeleteDialog
            open={showDeleteModal}
            handleAgree={() => {
              deleteCompany(value);
            }}
            handleClose={() => setShowDeleteModal(false)}
            title="Are you sure?"
            body="Are you sure you want to delete this Company records? Once deleted the data can not be retrived!"
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CompanyDetails;
