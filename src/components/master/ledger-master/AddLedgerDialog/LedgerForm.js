import React, { useEffect } from "react";

import { FormControlLabel, Grid, Switch } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../../store/constant";

// material-ui
import {
  TextField,
  Typography,
  Collapse,
  Fade,
} from "@material-ui/core";

// project imports
import useAuth from "../../../../hooks/useAuth";
import AccountGroupSelect from "../AccountGroupSelect";

// const AddUserDialog = ({ open, handleClose }) => {
const LedgerForm = ({ handleNext, setErrorIndex, values, setValues, receivable, setReceivable, payable, setPayable, bs, setBs }) => {
  const { user } = useAuth();
//   const { addCompanyLedger } = useLedgerMaster();
  // const { mid } = useParams();
//   const [clicked, setClicked] = useState(false);
//   const [receivable, setReceivable] = useState(false);
//   const [payable, setPayable] = useState(false);

//   const [values, setValues] = useState({
//     ledger_name: null,
//     old_ledger_id: null,
//     payment_terms: null,
//     delivery_terms: null,
//     vat_no: null,
//     cc_exp_date: null,
//     cc_no: null,
//     id_exp_date: null,
//     id_no: null,
//     cr_exp_date: null,
//     cr_no: null,
//     tax_reg_no: null,
//     block_ac: null,
//     credit_rating: null,
//     credit_limit: null,
//     bank_ac_no: null,
//     bank_code: null,
//     branch_name: null,
//     bank_name: null,
//     contact_person: null,
//     email: null,
//     tel: null,
//     address: null,
//     maintain_billwise: null,
//     acc_group_id: null,
//     is_fixed: false,
//     company_master_id: parseInt(mid),
//     created_by: user.email,
//   });

  useEffect(() => {
    setValues({
      ...values,
      created_by: user.email,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

//   const handleSubmit = async () => {
//     setClicked(true);
//     let form = { ...values };
//     form.acc_group_id = parseInt(form.acc_group_id.id);
//     // form.bank_ac_no = parseInt(form.bank_ac_no);
//     // form.credit_limit = parseFloat(form.credit_limit);
//     form.credit_days = parseInt(form.credit_days);
//     if (!(receivable || payable)) {
//       form.maintain_billwise = false;
//       form = {
//         ...form,
//         payment_terms: null,
//         delivery_terms: null,
//         vat_no: null,
//         cc_exp_date: null,
//         cc_no: null,
//         id_exp_date: null,
//         id_no: null,
//         cr_exp_date: null,
//         cr_no: null,
//         tax_reg_no: null,
//         contact_person: null,
//         email: null,
//         tel: null,
//         address: null,
//       };
//     } else {
//       form.maintain_billwise = true;
//     }
//     if (!receivable) {
//       form = {
//         ...form,
//         credit_limit: null,
//         credit_days: null,
//         credit_rating: null,
//         block_ac: null,
//       };
//     } else if (!payable) {
//       form = {
//         ...form,
//         bank_name: null,
//         bank_code: null,
//         branch_name: null,
//         bank_ac_no: null,
//       };
//     }
//     // form.child_of = parseInt(form.child_of.id);
//     console.log(form);
//     await addCompanyLedger(form);
//     setClicked(false);
//     setValues({
//       ledger_name: null,
//       old_ledger_id: null,
//       payment_terms: null,
//       delivery_terms: null,
//       vat_no: null,
//       cc_exp_date: null,
//       cc_no: null,
//       id_exp_date: null,
//       id_no: null,
//       cr_exp_date: null,
//       cr_no: null,
//       tax_reg_no: null,
//       block_ac: false,
//       credit_rating: null,
//       credit_limit: null,
//       bank_ac_no: null,
//       bank_code: null,
//       branch_name: null,
//       bank_name: null,
//       contact_person: null,
//       email: null,
//       tel: null,
//       address: null,
//       maintain_billwise: null,
//       acc_group_id: null,
//       is_fixed: false,
//       company_master_id: parseInt(mid),
//       created_by: user.email,
//     });
//     handleClose();
//   };

  return (
    // <Dialog
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="create-user"
    //   fullWidth
    //   maxWidth="sm"
    // >
    //   <DialogTitle id="form-dialog-title">
    //     <Typography variant="h4">Create Ledger</Typography>
    //   </DialogTitle>
    //   <DialogContent>
    //     <DialogContentText>
    //       <Typography variant="body2">Create a new Ledger.</Typography>
    //     </DialogContentText>
        <Grid container spacing={gridSpacing}>
          {/* {JSON.stringify(values.acc_group_id,null,2)} */}
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="ledger_name"
              label="Ledger Name"
              value={values.ledger_name}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="old_ledger_id"
              label="Old Ledger ID"
              value={values.old_ledger_id}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AccountGroupSelect
              captionLabel="Account Group"
              InputLabelProps={{ shrink: true }}
              selected={values.acc_group_id}
              onChange={handleSelect}
              setReceivable={setReceivable}
              setPayable={setPayable}
              bs={bs}
              setBs={setBs}
            />
          </Grid>
          <Grid item sm={12}>
            <Collapse in={payable || receivable} timeout={1000}>
              <Fade in={payable || receivable}>
                <Grid container spacing={gridSpacing}>
                  <Grid item sm={12}>
                    <Typography variant="h4">
                      Payables And Receivables Related Fields
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      id="address"
                      label="Address"
                      value={values.address}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="tel"
                      label="Telephone No."
                      value={values.tel}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email"
                      value={values.email}
                      type="email"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="contact_person"
                      label="Contact Person"
                      value={values.contact_person}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="tax_reg_no"
                      label="Tax Registrtion No."
                      value={values.tax_reg_no}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="vat_no"
                      label="VAT No."
                      value={values.vat_no}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="cr_no"
                      label="CR No."
                      value={values.cr_no}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="cr_exp_date"
                      label="CR Expiry Date"
                      value={values.cr_exp_date}
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="id_no"
                      label="ID No."
                      value={values.id_no}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="id_exp_date"
                      label="ID Expiry Date"
                      value={values.id_exp_date}
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="cc_no"
                      label="CC No."
                      value={values.cc_no}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="cc_exp_date"
                      label="CC Expiry Date"
                      value={values.cc_exp_date}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="delivery_terms"
                      label="Delivery Terms"
                      value={values.delivery_terms}
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
                      id="credit_days"
                      label="Credit Days"
                      value={values.credit_days}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                      type="number"
                    />
                  </Grid>
                  {/* <Grid item sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          id="maintain_billwise"
                          checked={values.maintain_billwise}
                          onChange={handleChecked}
                          name="maintain_billwise"
                          color="primary"
                        />
                      }
                      label="Maintain Billwise"
                    />
                  </Grid> */}
                </Grid>
              </Fade>
            </Collapse>
          </Grid>
          <Grid item sm={12}>
            <Collapse in={payable} style={{ transitionDelay: "500ms" }}>
              <Fade in={payable}>
                <Grid container spacing={gridSpacing}>
                  <Grid item sm={12}>
                    <Typography variant="h4">
                      Payables Related Fields
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="bank_name"
                      label="Bank Name"
                      value={values.bank_name}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="branch_name"
                      label="Branch Name"
                      value={values.branch_name}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="bank_code"
                      label="Bank Code"
                      value={values.bank_code}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="bank_ac_no"
                      label="Bank A/C No."
                      value={values.bank_ac_no}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Fade>
            </Collapse>
            <Collapse in={receivable} style={{ transitionDelay: "500ms" }}>
              <Fade in={receivable}>
                <Grid container spacing={gridSpacing}>
                  <Grid item sm={12}>
                    <Typography variant="h4">
                      Receivables Related Fields
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="credit_limit"
                      label="Credit Limit"
                      value={values.credit_limit}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="credit_rating"
                      label="Credit Rating"
                      value={values.credit_rating}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          id="block_ac"
                          checked={values.block_ac}
                          onChange={handleChecked}
                          name="block_ac"
                          color="primary"
                        />
                      }
                      label="Block A/C"
                    />
                  </Grid>
                </Grid>
              </Fade>
            </Collapse>
          </Grid>
        </Grid>
    //   </DialogContent>
    //   <DialogActions sx={{ pr: 2.5 }}>
    //     <AnimateButton>
    //       <Button
    //         color="error"
    //         variant="contained"
    //         size="small"
    //         onClick={() => {
    //           setValues({
    //             ledger_name: null,
    //             old_ledger_id: null,
    //             payment_terms: null,
    //             delivery_terms: null,
    //             vat_no: null,
    //             cc_exp_date: null,
    //             cc_no: null,
    //             id_exp_date: null,
    //             id_no: null,
    //             cr_exp_date: null,
    //             cr_no: null,
    //             tax_reg_no: null,
    //             block_ac: false,
    //             credit_rating: null,
    //             credit_limit: null,
    //             bank_ac_no: null,
    //             bank_code: null,
    //             branch_name: null,
    //             bank_name: null,
    //             contact_person: null,
    //             email: null,
    //             tel: null,
    //             address: null,
    //             maintain_billwise: null, // not input
    //             acc_group_id: null,
    //             is_fixed: false,
    //             company_master_id: parseInt(mid),
    //             created_by: user.email,
    //           });
    //           handleClose();
    //         }}
    //         disabled={clicked}
    //         startIcon={<CancelIcon />}
    //       >
    //         Cancel
    //       </Button>
    //     </AnimateButton>
    //     <LoadingButton
    //       color="primary"
    //       variant="contained"
    //       size="small"
    //       onClick={handleSubmit}
    //       loading={clicked}
    //       startIcon={<SaveIcon />}
    //     >
    //       Add
    //     </LoadingButton>
    //   </DialogActions>
    // </Dialog>
  );
};

export default LedgerForm;
