import React, { useState, useEffect } from "react";

// material-ui
import {
  Button,
  Grid,
  Stack,
  TextField,
  makeStyles,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

// project imports
import { useHistory, useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";

// assets
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import useLC from "../../../../hooks/useLC";
import MainCard from "../../../../ui-component/cards/MainCard";
import LoadingButton from "../../../../ui-component/LoadingButton";
import ProtectedDeleteDialog from "../../../../components/ProtectedDeleteDialog";
import CostCenterSelect from "../../../../components/master/LC/CostCenterSelect";
import PartyCodePaySelect from "../../../../components/master/LC/PartyCodePaySelect";
import PartyCodeRecSelect from "../../../../components/master/LC/PartyCodeRecSelect";
import BankAcSelect from "../../../../components/master/LC/BankACSelect";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";
import CurrencySelect from "../../../../components/company/CurrencySelect";

//-----------------------|| User Form ||-----------------------//

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

const LcForm = () => {
  const { pathname } = useLocation();

  let flag = true; // Show Payables for import
  if (pathname.includes("/export")) {
    //Show Recievables for export
    flag = false;
  }

  const history = useHistory();
  const classes = useStyles();

  const { lc_detail } = useSelector((state) => state.lc);

  const {
    updateImportLC,
    updateExportLC,
    deleteLC,
    getLCDetail,
    getPartyCodePay,
  } = useLC();

  const { lc_id, mid } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [values, setValues] = useState(null);
  const [clicked, setClicked] = useState(false);

  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [checkList, setCheckList] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

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
    if (lc_detail) {
      setValues({ ...lc_detail });
    } else getLCDetail(lc_id);
  }, [lc_detail]);

  const handleClose = () => setShowDeleteModal(false);

  const handleUpdateLC = async () => {
    setClicked(true);
    let form = { ...values };
    form.cost_center = form.cost_center.id;
    form.party_code = form.party_code.id;
    form.bank_ac = form.bank_ac.id;
    form.base_currency = form.base_currency.id;
    flag ? await updateImportLC(form) : await updateExportLC(form);
    setClicked(false);
    // history.replace("/company/9/master/lc/import/1");
  };

  const handleAgree = () => {
    deleteLC(values.id);
    history.replace(`/company/${mid}/master/lc/import`);
  };

  return (
    values && (
      <MainCard title="LC Details">
        <div className={classes.root}>
          <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item sm={6} md={8}>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              <SubCard title="Edit LC Details">
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="trans_type"
                      disabled
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
                      <PartyCodePaySelect
                        captionLabel="Party Code(Payables)"
                        InputLabelProps={{ shrink: true }}
                        selected={values.party_code}
                        onChange={handleSelect}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={6}>
                      <PartyCodeRecSelect
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
                    <BankAcSelect
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
                  <Grid item xs={12} sm={6}>
                    <CurrencySelect
                      captionLabel="Currency"
                      InputLabelProps={{ shrink: true }}
                      selected={values.base_currency}
                      onChange={handleSelect}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="lc_amount"
                      label="LC Amount"
                      type="tel"
                      value={values.lc_amount}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{ inputProps: { max: 1 } }}
                      // inputProps={{
                      //   pattern: "[0-9]*",
                      // }}
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
                            onClick={handleUpdateLC}
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
                history.replace(`/company/${mid}/master/lc/import`);
              }}
              handleClose={() => setShowDeleteModal(false)}
              title="Are you sure?"
              body="Are you sure you want to delete this LC records? Once deleted the data can not be retrived!"
            />
          </Grid>
        </div>
      </MainCard>
    )
  );
};

export default LcForm;
