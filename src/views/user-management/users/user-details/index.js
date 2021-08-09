import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs, Button, Typography } from "@material-ui/core";

// project imports
import useUserPermissions from "../../../../hooks/useUserPermissions";
import MainCard from "../../../../ui-component/cards/MainCard";
import UserForm from "./UserForm";
import SelectGroup from "./select-group";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import AddDocumentDialog from "../../../../components/company/AddDocumentDialog";

import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";

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

//-----------------------|| User Details ||-----------------------//

const UserDetails = () => {
  const classes = useStyles();
  const { uid } = useParams();

  const { getSelectedUserAccount, getUserCompanyGroup } = useUserPermissions();

  useEffect(() => {
    if (!uid) return;
    getSelectedUserAccount(uid);
    getUserCompanyGroup(uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const [value, setValue] = React.useState(0);
  const [showAddModal, setShowAddModal] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard title="User Details">
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
            label="Profile"
            icon={<AccountCircleTwoToneIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(0)}
          />
          <Tab
            component={Link}
            to="#"
            label="Extra"
            icon={<DescriptionTwoToneIcon sx={{ fontSize: "1.3rem" }} />}
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <UserForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SelectGroup />
        </TabPanel>
      </div>
      <AddDocumentDialog
        open={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
      {/* <pre>{JSON.stringify(current_user_account, null, 2)}</pre> */}
    </MainCard>
  );
};

export default UserDetails;
