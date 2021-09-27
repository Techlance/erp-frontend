import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useSelector } from "react-redux";

// material-ui
import {
  Button,
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

// project imports
import useLC from "../../../../hooks/useLC";
import { gridSpacing } from "../../../../store/constant";
import CostCenterSelect from "../../../../components/master/LC/CostCenterSelect";
import PartyCodePaySelect from "../../../../components/master/LC/PartyCodePaySelect";
import PartyCodeRecSelect from "../../../../components/master/LC/PartyCodeRecSelect";
import BankAcSelect from "../../../../components/master/LC/BankACSelect";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";
import CurrencySelect from "../../../../components/company/CurrencySelect";
import ValidationDialog from "../../../../components/ValidationDialog";

// assets
import SubCard from "../../../../ui-component/cards/SubCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import LoadingButton from "../../../../ui-component/LoadingButton";
import MainCard from "../../../../ui-component/cards/MainCard";

//-----------------------|| User Form ||-----------------------//

const LCForm = () => {
  const { pathname } = useLocation();

  let flag = true; // Show Payables for import
  if (pathname.includes("/export")) {
    //Show Recievables for export
    flag = false;
  }

  let lc_amount_reg = false;
  let day_reg = false;
  // const lcAmountRegex = new RegExp("^[0-9]+$");
  const lcAmountRegex = new RegExp("^([0-9]*[.])?[0-9]+$");

  const dayRegex = new RegExp("^[0-9]{1,2}$");

  const history = useHistory();

  const { lc_detail } = useSelector((state) => state.lc);

  const { updateImportLC, updateExportLC, deleteLC, getLCDetail } = useLC();

  const { lc_id, mid, year_id } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  const [values, setValues] = useState(null);
  const [clicked, setClicked] = useState(false);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lc_detail]);

  const handleUpdateLC = async () => {
    if (lc_amount_reg && day_reg) {
      setClicked(true);
      let form = { ...values };
      form.id = null;
      // form.year_id = null;
      form.cost_center = form.cost_center.id;
      form.party_code = form.party_code.id;
      form.bank_ac = form.bank_ac.id;
      form.base_currency = form.base_currency.id;
      flag ? await updateImportLC(form) : await updateExportLC(form);
      setClicked(false);
    } else {
      setShowValidationModal(true);
    }
    // history.replace("/company/9/master/lc/import/1");
  };

  const handleAgree = async () => {
    await deleteLC(values.id);
    history.replace(`/company/${mid}/${year_id}/master/lc/import`);
  };

  return (
    values && (
      <MainCard title="LC Details">
        <Grid container spacing={gridSpacing} justifyContent="center">
          <Grid item sm={6} md={8}>
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
                    required
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
                      captionLabel="Party Code(Payables)*"
                      InputLabelProps={{ shrink: true }}
                      selected={values.party_code}
                      onChange={handleSelect}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={6}>
                    <PartyCodeRecSelect
                      captionLabel="Party Code(Receivables)*"
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
                    required
                    label="Applicant Bank"
                    value={values.applicant_bank}
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
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
                    required
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
                    required
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
                    required
                    id="bank_ref"
                    label="Bank Ref."
                    InputLabelProps={{ shrink: true }}
                    value={values.bank_ref}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="days_for_submit_to_bank"
                    label="Days Remaining To Return To Bank"
                    type="number"
                    value={values.days_for_submit_to_bank}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      color: dayRegex.test(values.days_for_submit_to_bank)
                        ? "primary"
                        : "error",
                    }}
                    helperText={
                      dayRegex.test(values.days_for_submit_to_bank)
                        ? ""
                        : "Days cannot be negative and can only be 2 digit integer."
                    }
                    error={
                      dayRegex.test(values.days_for_submit_to_bank)
                        ? false
                        : true
                    }
                    onChange={handleChange}
                  />
                  {
                    (day_reg = dayRegex.test(values.days_for_submit_to_bank)
                      ? true
                      : false)
                  }
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
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
                    required
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
                    required
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
                    label="Completed*"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    required
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
                    required
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
                    required
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
                    required
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
                    captionLabel="Currency*"
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
                    required
                    type="number"
                    value={values.lc_amount && Math.abs(values.lc_amount)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      color: lcAmountRegex.test(values.lc_amount)
                        ? "primary"
                        : "error",
                    }}
                    helperText={
                      lcAmountRegex.test(values.lc_amount)
                        ? ""
                        : "LC Amount cannot be negative and can only be number."
                    }
                    error={lcAmountRegex.test(values.lc_amount) ? false : true}
                    onChange={handleChange}
                  />
                  {
                    (lc_amount_reg = lcAmountRegex.test(values.lc_amount)
                      ? true
                      : false)
                  }
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
            handleAgree={handleAgree}
            handleClose={() => setShowDeleteModal(false)}
            title="Are you sure?"
            body="Are you sure you want to delete this LC records? Once deleted the data can not be retrived!"
          />
          <ValidationDialog
            open={showValidationModal}
            handleAgree={() => {
              // deleteCompany(values.id);
              // history.replace("/admin/companies");
            }}
            handleClose={() => setShowValidationModal(false)}
            title="Mistakenly entered wrong values?"
            body="Please enter valid values to save the changes !"
          />
          ;
        </Grid>
      </MainCard>
    )
  );
};

export default LCForm;
