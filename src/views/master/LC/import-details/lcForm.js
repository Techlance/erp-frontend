import React, { useState, useEffect } from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
} from "@material-ui/core";

import { useHistory, useLocation, useParams } from "react-router";

// assets
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import CloudUploadIcon from "@material-ui/icons/CloudUploadTwoTone";

// project imports
import CurrencySelect from "../../../../components/company/CurrencySelect";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";
import { useSelector } from "react-redux";
import LoadingButton from "../../../../ui-component/LoadingButton";
import useLC from "../../../../hooks/useLC";
import config from "../../../../config";
import CostCenterSelect from "../../../../components/master/LC/CostCenterSelect";

// style constant
// const useStyles = makeStyles((theme) => ({
//   accountAvatar: {
//     width: "100px",
//     height: "100px",
//     margin: "0 auto",
//   },
//   accountContent: {
//     textAlign: "center",
//   },
// }));

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

//-----------------------|| LC Form ||-----------------------//

const LcForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const { pathname } = useLocation();
  console.log(pathname);

  let flag = true; // Show Payables for import
  if (pathname.includes("/export")) {
    //Show Recievables for export
    flag = false;
  }

  const { l_c } = useSelector((state) => state.lc);

  const { current_company } = useSelector((state) => state.company);
  // const { updateCompany, deleteCompany } = useCompany();
  const { getLC, updateLC, deleteLC } = useLC();

  const { lc_id, mid } = useParams();

  const [showAddCurrencyModal, setShowAddCurrencyModal] = useState(false);
  //   const [showImageModal, setShowImageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [values, setValues] = useState({ ...current_company });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFileUpload = (event) => {
    setValues({
      ...values,
      logo: event.target.files[0],
    });
  };

  useEffect(() => {
    setValues({ ...current_company });
  }, [current_company]);

  useEffect(() => {
    if (l_c) {
      let lc_det = l_c.find((lc) => lc.id === parseInt(lc_id));
      if (lc_det) {
        setValues(lc_det);
      } else {
        // history.replace(config.defaultPath);
      }
    } else {
      getLC(mid);
    }
  }, [l_c]);

  const handleUpdateDetails = async () => {
    setClicked(true);
    await updateLC(values);
    setClicked(false);
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item sm={6} md={8}>
        <SubCard title="Edit LC Details">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="trans_type"
                label="Transaction Type"
                value={values.trans_type}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lc_date"
                label="LC Date"
                InputLabelProps={{ shrink: true }}
                type="date"
                value={values.lc_date}
                onChange={handleChange}
              />
            </Grid>
            {flag ? (
              <Grid item xs={12} sm={6}>
                <CurrencySelect
                  captionLabel="Party Code(Payables)"
                  InputLabelProps={{ shrink: true }}
                  selected={values.party_code}
                  onChange={handleSelect}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6}>
                <CurrencySelect
                  captionLabel="Party Code(Receivables)"
                  InputLabelProps={{ shrink: true }}
                  selected={values.party_code}
                  onChange={handleSelect}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <CostCenterSelect
                captionLabel="Cost Center"
                InputLabelProps={{ shrink: true }}
                selected={values.cost_center}
                onChange={handleSelect}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="applicant_bank"
                label="Applicant Bank"
                value={values.applicant_bank}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="applicant_bank_lc_no"
                label="Applicant Bank LC No."
                value={values.applicant_bank_lc_no}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="benificiary_bank"
                label="Beneficiary Bank"
                value={values.benificiary_bank}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="benificiary_bank_lc_no"
                label="Beneficiary Bank LC No."
                value={values.benificiary_bank_lc_no}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    id="inspection"
                    checked={values.inspection}
                    onChange={handleChecked}
                    name="inspection"
                    color="primary"
                  />
                }
                label="Inspection Certificate"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="bank_ref"
                label="Bank Ref."
                InputLabelProps={{ shrink: true }}
                value={values.bank_ref}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="days_for_submit_to_bank"
                label="Days Remaining To Return To Bank"
                type="number"
                value={values.days_for_submit_to_bank}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="payment_terms"
                label="Payment Terms"
                value={values.payment_terms}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="place_of_taking_incharge"
                label="Incharge Taking Place"
                value={values.place_of_taking_incharge}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="final_destination_of_delivery"
                label="Final Delivery Destination"
                value={values.final_destination_of_delivery}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    id="completed"
                    checked={values.completed}
                    onChange={handleChecked}
                    name="completed"
                    color="primary"
                  />
                }
                label="Completed"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                multiline
                id="shipment_terms"
                label="Shipment Terms"
                InputLabelProps={{ shrink: true }}
                value={values.shipment_terms}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                multiline
                id="goods_description"
                label="Goods Description"
                InputLabelProps={{ shrink: true }}
                value={values.goods_description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                multiline
                id="other_lc_terms"
                label="Other LC Terms"
                InputLabelProps={{ shrink: true }}
                value={values.other_lc_terms}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CurrencySelect
                captionLabel="Bank A/C"
                InputLabelProps={{ shrink: true }}
                selected={values.bank_ac}
                onChange={handleSelect}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="expiry_date"
                label="Expiry Date"
                InputLabelProps={{ shrink: true }}
                type="date"
                InputProps={{ inputProps: { min: values.lc_date } }}
                value={values.expiry_date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="lc_amount"
                label="LC Amount"
                type="number"
                value={values.lc_amount}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row">
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setShowDeleteModal(true)}
                        disabled={clicked}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateDetails}
                      startIcon={<SaveIcon />}
                      loading={clicked}
                    >
                      Save Details
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <ConfirmDeleteDialog
        open={showDeleteModal}
        handleAgree={() => {
          deleteLC(values.id);
          // history.replace("/admin/companies");
        }}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this LC records? Once deleted the data can not be retrived!"
      />
    </Grid>
  );
};

export default LcForm;
