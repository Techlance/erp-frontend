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
import useAuth from "../../../hooks/useAuth";
import useUserPermissions from "../../../hooks/useUserPermissions";
import { gridSpacing } from "../../../store/constant";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import UserGroupsSelect from "../../../components/user-management/UserGroupsSelect";

// assets
import AddCircleIcon from "@material-ui/icons/AddCircle";
import MainCard from "../../../ui-component/cards/MainCard";
import TransactionsTable from "./TransactionsTable";

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

  const [value, setValue] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSelect = (key, value) => {
    setValue(value.id);

    setValues({
      ...values,
      [key]: value,
    });
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
        <MainCard title="User Rights Settings" content={true}>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <UserGroupsSelect
                captionLabel="User Group Name"
                selected={values.user_group_id}
                onChange={handleSelect}
              />

              <Grid item xs={12}>
                <TransactionsTable value={value} />
              </Grid>
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
