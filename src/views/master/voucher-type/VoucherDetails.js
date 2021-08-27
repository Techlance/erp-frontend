import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

// material-ui
import { Button, Grid, Stack, TextField, makeStyles } from "@material-ui/core";

// project imports
import useVoucherTypes from "../../../hooks/useVoucherTypes";
import { gridSpacing } from "../../../store/constant";
import SubCard from "../../../ui-component/cards/SubCard";
import ProtectedDeleteDialog from "../../../components/ProtectedDeleteDialog";

// assets
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import MainCard from "../../../ui-component/cards/MainCard";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import LoadingButton from "../../../ui-component/LoadingButton";

//-----------------------|| Voucher Type Form ||-----------------------//

const useStyles = makeStyles((theme) => ({
  accountTab: {
    "marginBottom": "24px",
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

const UserForm = () => {
  const history = useHistory();
  const classes = useStyles();

  const { voucher_type_details } = useSelector((state) => state.voucherTypes);

  const { getVoucherTypesDetail } = useVoucherTypes();

  const { vid, mid } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [values, setValues] = useState(null);
  const [clicked, setClicked] = useState(false);

  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [checkList, setCheckList] = useState({});

  // const handleChecked = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  useEffect(() => {
    if (voucher_type_details) {
      // setCheckList({
      //   Ledgers: voucher_type_details,
      // });
      setValues({ ...voucher_type_details });
    } else {
      getVoucherTypesDetail(vid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucher_type_details]);

  const handleAgree = () => {
    // deleteCompanyAccountGroup(values.id);
    history.replace(`/company/${mid}/master/voucher-type`);
  };

  return (
    values && (
      <MainCard title="Voucher Type Details">
        <div className={classes.root}>
          <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item sm={12} md={8}>
              <SubCard title="Edit Account Group">
                <Grid container>
                  <pre>{JSON.stringify(voucher_type_details, null, 2)}</pre>
                </Grid>
              </SubCard>
            </Grid>
            <ProtectedDeleteDialog
              checkList={checkList}
              showDeleteModal={showDeleteModal}
              handleAgree={handleAgree}
              handleClose={() => setShowDeleteModal(false)}
              title="Are you sure?"
              body="Are you sure you want to delete this Account Head? Once deleted the data can not be retrived!"
            />
          </Grid>
        </div>
      </MainCard>
    )
  );
};

export default UserForm;
