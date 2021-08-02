import PropTypes from "prop-types";
import React, { useState } from "react";
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
import GroupsProfile from "./GroupsProfile";
import MainCard from "../../../../ui-component/cards/MainCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import { gridSpacing, MEDIA_URI } from "../../../../store/constant";

// assets
// import Avatar1 from "../../../../assets/images/users/user-round.svg";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import useCompany from "../../../../hooks/useCompany";
import formatDate from "../../../../utils/format-date";

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
    "id": `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// tabs option
// let tabsOption = [
//   {
//     label: "CREATE",
//     icon: <AddCircleIcon fontSize="large" />,
//     caption: "Add A New Company",
//   },
// ];

// const transformCompany = (companies) => {

//   return
// }

//-----------------------|| PROFILE 2 ||-----------------------//

const CompanyDetails = () => {
  const classes = useStyles();
  const {
    companies,
    currentCompany,
    getSelectedCompany,
    updateCompany,
    deleteCompany,
  } = useCompany();
  const customization = useSelector((state) => state.customization);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getSelectedCompany(newValue);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="Account Settings" content={false}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={4}>
              <CardContent>
                <Tabs
                  value={value}
                  onChange={handleChange}
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
                    key={-1}
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
                            Add A User Group
                          </span>
                        </Typography>
                      </Grid>
                    }
                    {...a11yProps(-1)}
                  />
                  {companies.map((tab) => (
                    <Tab
                      key={tab.user_group_name}
                      value={tab.user_group_name}
                      icon={<Avatar src={`${MEDIA_URI}${tab.logo}`} />}
                      label={
                        <Grid container direction="column">
                          <Typography variant="subtitle1" color="inherit">
                            <span style={{ margin: "0 10px" }}>
                              {`${tab.user_group_name}`}
                            </span>
                          </Typography>
                          <Typography
                            component="div"
                            variant="caption"
                            sx={{ textTransform: "capitalize" }}
                          >
                            <span style={{ margin: "0 10px" }}>
                              {formatDate(tab.backdated_days)}
                            </span>
                          </Typography>
                        </Grid>
                      }
                      {...a11yProps(tab.user_group_name)}
                    />
                  ))}
                </Tabs>
              </CardContent>
            </Grid>
            <Grid item xs={12} lg={8}>
              <CardContent className={classes.cardPanels}>
                <TabPanel value={value} index={value}>
                  <GroupsProfile currentCompany={currentCompany} />
                </TabPanel>
              </CardContent>
            </Grid>
          </Grid>
          <Divider />
          <CardActions>
            <Grid container justifyContent="space-between" spacing={0}>
              <Grid item>
                {value >= -1 && (
                  <AnimateButton>
                    <Button variant="outlined" size="large" color="primary">
                      Back
                    </Button>
                  </AnimateButton>
                )}
              </Grid>

              <Grid item>
                <Grid container justifyContent="space-between" spacing={10}>
                  {currentCompany.id !== -1 ? (
                    <Grid item>
                      <AnimateButton>
                        <Button
                          variant="contained"
                          size="large"
                          color="error"
                          // onClick={(e) => handleChange(e, 1 + parseInt(value))}
                          onClick={(e) => {
                            deleteCompany(currentCompany.id);
                          }}
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
                          updateCompany(currentCompany.id, currentCompany);
                        }}
                      >
                        {currentCompany.id === -1 ? "Create" : "Update"}
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardActions>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CompanyDetails;
