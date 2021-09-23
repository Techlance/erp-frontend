import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

// material-ui
import { Collapse, Grid, TextField, makeStyles } from "@material-ui/core";

// project imports
import useVoucherTypes from "../../../hooks/useVoucherTypes";
import { gridSpacing } from "../../../store/constant";
import SubCard from "../../../ui-component/cards/SubCard";

// assets
import MainCard from "../../../ui-component/cards/MainCard";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import AuthorizationIDSelect from "../../../components/master/voucher-types/AuthorizationIDSelect";
import VoucherClassSelect from "../../../components/master/voucher-types/VoucherClassSelect";
import AutoNumberingCheckbox from "../../../components/master/voucher-types/AutoNumberingCheckbox";
import RestartSelect from "../../../components/master/voucher-types/RestartSelect";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import LoadingButton from "../../../ui-component/LoadingButton";
import Loader from "../../../ui-component/Loader";

//-----------------------|| Voucher Type Form ||-----------------------//

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

const VoucherTypeDetails = () => {
  const history = useHistory();
  const classes = useStyles();

  const { voucher_type_details } = useSelector((state) => state.voucherTypes);

  const { getVoucherTypesDetail, updateVoucherTypes, deleteVoucherTypes } =
    useVoucherTypes();

  const { vid, mid } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [values, setValues] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  useEffect(() => {
    if (voucher_type_details) {
      setValues({ ...voucher_type_details });
    } else {
      getVoucherTypesDetail(vid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucher_type_details]);

  const handleAgree = async () => {
    setClicked(true);
    await deleteVoucherTypes(values.id, () =>
      history.replace(`/company/${mid}/master/voucher-type`)
    );
    setClicked(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleUpdateVoucherType = async () => {
    setClicked(true);
    if (values.authorization_id !== null) {
      values.authorization_id = values.authorization_id.id;
    } else {
      values.authorization_id = "null";
    }
    await updateVoucherTypes(values);
    setClicked(false);
  };

  if (!values) return <Loader />;

  return (
    <>
      <MainCard title="Voucher Type Details">
        <div className={classes.root}>
          <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item sm={12} md={8}>
              <SubCard title="Edit Voucher Type">
                <Grid container spacing={2} mb={2}>
                  <Grid item sm={6}>
                    <TextField
                      fullWidth
                      required
                      id="voucher_name"
                      label="Voucher Name"
                      value={values.voucher_name}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                      type="text"
                      disabled={values.is_fixed}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <VoucherClassSelect
                      fullWidth
                      captionLabel="Voucher Class*"
                      selected={values.voucher_class}
                      onChange={handleSelect}
                      disabled={values.is_fixed}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mb={2}>
                  <Grid item sm={12}>
                    <AuthorizationIDSelect
                      selected={values.authorization_id}
                      captionLabel="Authorization"
                      onChange={handleSelect}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mb={2}>
                  <Grid item sm={6}>
                    <AutoNumberingCheckbox
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      id="auto_numbering"
                      captionLabel="Auto Numbering"
                      selected={values.auto_numbering}
                      onChange={handleChecked}
                    />
                  </Grid>
                </Grid>
                <Collapse in={values.auto_numbering}>
                  <Grid container spacing={2} mb={2}>
                    <Grid item sm={6}>
                      <TextField
                        fullWidth
                        id="prefix"
                        label="Prefix"
                        value={values.prefix}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                        type="text"
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <RestartSelect
                        captionLabel="Restart"
                        selected={values.restart}
                        onChange={handleSelect}
                      />
                    </Grid>
                  </Grid>
                </Collapse>

                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="space-between"
                >
                  <LoadingButton
                    variant="contained"
                    loading={clicked}
                    color="error"
                    size="small"
                    onClick={() => setShowDeleteModal(true)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </LoadingButton>

                  <LoadingButton
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleUpdateVoucherType}
                    startIcon={<SaveIcon />}
                    loading={clicked}
                  >
                    Save Details
                  </LoadingButton>
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        </div>
      </MainCard>
      <ConfirmDeleteDialog
        open={showDeleteModal}
        handleAgree={handleAgree}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this Voucher Type? Once deleted the data can not be retrived!"
      />
    </>
  );
};

export default VoucherTypeDetails;
