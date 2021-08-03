import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
import RightsProfile from "./RightsProfile";
import MainCard from "../../../../ui-component/cards/MainCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import { gridSpacing } from "../../../../store/constant";
import useUserPermissions from "../../../../hooks/useUserPermissions";
import useAuth from "../../../../hooks/useAuth";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";

// assets
import AddCircleIcon from "@material-ui/icons/AddCircle";

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

//-----------------------|| USER MANAGEMENT - USER RIGHTS ||-----------------------//

const CompanyDetails = () => {
  const classes = useStyles();
  const { user } = useAuth();

  const {
    user_rights,
    current_user_right,
    getSelectedUserRight,
    updateUserRights,
    deleteUserRights,
  } = useUserPermissions();

  const customization = useSelector((state) => state.customization);
  const [value, setValue] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    getSelectedUserRight(newValue);
  };

  // constants
  const INIT_STATE = {
    user_group_id: null,
    transaction_id: null,
    can_create: true,
    can_alter: true,
    can_delete: true,
    can_view: true,
    created_by: user.email,
  };

  const [values, setValues] = useState(() => {
    if (value === 0) {
      return INIT_STATE;
    }

    return {
      user_group_id: current_user_right.user_group_id,
      transaction_id: current_user_right.transaction_id,
      can_create: current_user_right.can_create,
      can_alter: current_user_right.can_alter,
      can_delete: current_user_right.can_delete,
      can_view: current_user_right.can_view,
      created_by: current_user_right.created_by,
    };
  });

  useEffect(() => {
    setValues(() => {
      if (value === 0) return INIT_STATE;

      return {
        user_group_id: current_user_right.user_group_id,
        transaction_id: current_user_right.transaction_id,
        can_create: current_user_right.can_create,
        can_alter: current_user_right.can_alter,
        can_delete: current_user_right.can_delete,
        can_view: current_user_right.can_view,
        created_by: current_user_right.created_by,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_user_right, value]);

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
                            Add A User Right
                          </span>
                        </Typography>
                      </Grid>
                    }
                    {...a11yProps(0)}
                  />
                  {user_rights.map((tab) => (
                    <Tab
                      key={tab.id}
                      value={tab.id}
                      icon={<Avatar />}
                      label={
                        <Grid container direction="column">
                          <Typography variant="subtitle1" color="inherit">
                            <span style={{ margin: "0 10px" }}>
                              {tab.user_group_id?.user_group_name}
                            </span>
                          </Typography>
                          <Typography
                            component="div"
                            variant="caption"
                            sx={{ textTransform: "captalize" }}
                          >
                            <span style={{ margin: "0 10px" }}>
                              {tab.transaction_id?.transactions}
                            </span>
                          </Typography>
                        </Grid>
                      }
                      {...a11yProps(tab.user_group_id?.id)}
                    />
                  ))}
                </Tabs>
              </CardContent>
            </Grid>
            <Grid item xs={12} lg={8}>
              <CardContent className={classes.cardPanels}>
                <TabPanel value={value} index={value}>
                  <RightsProfile values={values} setValues={setValues} />
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
                        onClick={(e) => {
                          updateUserRights(value, values);
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
            handleAgree={() => deleteUserRights(value)}
            handleClose={() => setShowDeleteModal(false)}
            title="Are you sure?"
            body="Are you sure you want to delete this User Rights record? Once deleted the data can not be retrived!"
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CompanyDetails;
