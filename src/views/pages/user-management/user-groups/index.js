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
import { gridSpacing } from "../../../../store/constant";

// assets
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MainCard from "../../../../ui-component/cards/MainCard";
import GroupsProfile from "./GroupsProfile";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";

// project imports
import useAuth from "../../../../hooks/useAuth";
import useUserPermissions from "../../../../hooks/useUserPermissions";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";

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

//-----------------------|| USER MANAGEMENT - USER GROUPS ||-----------------------//

const CompanyDetails = () => {
  const classes = useStyles();
  const { user } = useAuth();

  const customization = useSelector((state) => state.customization);
  const [value, setValue] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    user_groups,
    current_user_group,
    getSelectedUserGroup,
    updateUserGroup,
    deleteUserGroup,
  } = useUserPermissions();

  const handleTabChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    getSelectedUserGroup(newValue);
  };

  // constants
  const INIT_STATE = {
    user_group_name: "",
    backdated_days: "",
    created_by: user.email,
  };

  const [values, setValues] = useState(() => {
    if (value.id === 0) {
      return INIT_STATE;
    }
    return {
      user_group_name: current_user_group.user_group_name,
      backdated_days: current_user_group.backdated_days,
      created_by: current_user_group.created_by,
    };
  });

  useEffect(() => {
    setValues(() => {
      if (value === 0) return INIT_STATE;

      return {
        user_group_name: current_user_group.user_group_name,
        backdated_days: current_user_group.backdated_days,
        created_by: current_user_group.created_by,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_user_group, value]);

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
                            Add A User Group
                          </span>
                        </Typography>
                      </Grid>
                    }
                    {...a11yProps(0)}
                  />
                  {user_groups.map((tab) => (
                    <Tab
                      key={tab.id}
                      value={tab.id}
                      icon={<Avatar />}
                      label={
                        <Grid container direction="column">
                          <Typography variant="subtitle1" color="inherit">
                            <span style={{ margin: "0 10px" }}>
                              {tab.user_group_name}
                            </span>
                          </Typography>
                          <Typography
                            component="div"
                            variant="caption"
                            sx={{ textTransform: "lowercase" }}
                          >
                            <p style={{ margin: "0 10px" }}>{tab.created_by}</p>
                          </Typography>
                        </Grid>
                      }
                      {...a11yProps(tab.id)}
                    />
                  ))}
                </Tabs>
              </CardContent>
            </Grid>
            <Grid item xs={12} lg={8}>
              <CardContent className={classes.cardPanels}>
                <TabPanel value={value} index={value}>
                  <GroupsProfile values={values} setValues={setValues} />
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
                          updateUserGroup(value, values);
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
            handleAgree={() => deleteUserGroup(current_user_group.id)}
            handleClose={() => setShowDeleteModal(false)}
            title="Are you sure?"
            body="Are you sure you want to delete this user records? Once deleted the data can not be retrived!"
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CompanyDetails;
