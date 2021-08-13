import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs } from "@material-ui/core";

// project imports
import useUserPermissions from "../../../../hooks/useUserPermissions";
import MainCard from "../../../../ui-component/cards/MainCard";
import UserForm from "./UserForm";
import SelectGroup from "./select-group";

// assets
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import VerifiedUserTwoToneIcon from "@material-ui/icons/VerifiedUserTwoTone";
import AddDocumentDialog from "../../../../components/company/AddDocumentDialog";

// style constant



//-----------------------|| User Details ||-----------------------//

const UserDetails = () => {
  
  const { uid } = useParams();

  const { getSelectedUserAccount, getUserCompanyGroup } = useUserPermissions();

  useEffect(() => {
    if (!uid) return;
    getSelectedUserAccount(uid);
    getUserCompanyGroup(uid);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <MainCard title="User Details">
      <div className={classes.root}>
          <UserForm />
      </div>
    </MainCard>
  );
};

export default UserDetails;
