import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@material-ui/core";

// project imports
import useBRS from "../../../hooks/useBrs";
import { gridSpacing } from "../../../store/constant";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import AccountCodeSelect from "../../../components/master/brs/AccountCodeSelect";
import PaymentTypeTabs from "../../../components/master/brs/PaymentTypeTabs";

// assets
import Loader from "../../../ui-component/Loader";
import MainCard from "../../../ui-component/cards/MainCard";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import SubCard from "../../../ui-component/cards/SubCard";
import LoadingButton from "../../../ui-component/LoadingButton";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";

const BrsDetails = () => {
  const history = useHistory();
  const theme = useTheme();
  const { brs_id, mid, year_id } = useParams();

  const { brs_detail } = useSelector((state) => state.brs);

  const { getBrsDetails, updateBrs, deleteBrs } = useBRS();

  const [values, setValues] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // const handleChecked = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.checked,
  //   });
  // };

  const handleRadio = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleAgree = async () => {
    await deleteBrs(values.id);
    history.replace(`/company/${mid}/${year_id}/master/op-bal-brs`);
  };

  useEffect(() => {
    if (brs_detail) {
      setValues({ ...brs_detail });
    } else {
      getBrsDetails(brs_id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brs_detail]);

  const handleUpdateBrs = async () => {
    setClicked(true);
    await updateBrs(values);

    await getBrsDetails(brs_id);
    setClicked(false);
  };

  if (!values) return <Loader />;

  return (
    <>
      <MainCard title="BRS Details">
        <Grid container spacing={gridSpacing} justifyContent="center">
          <Grid item sm={12} md={8}>
            <SubCard title="Opening Balance BRS">
              <Grid container spacing={2} mb={2}>
                <Grid item sm={12}>
                  <AccountCodeSelect
                    captionLabel="Account Code"
                    selected={values.acc_code}
                    onChange={handleSelect}
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    value={values.name}
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                    type="text"
                  />
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    id="amount"
                    label="Amount"
                    value={values.amount}
                    onChange={handleChange}
                    type="text"
                  />
                </Grid>

                <Grid item sm={12}>
                  <PaymentTypeTabs
                    editable
                    values={values}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="h4">Transaction Type</Typography>
                  <RadioGroup
                    row
                    name="transaction_type"
                    aria-label="transaction-type"
                    value={values.transaction_type}
                    onChange={handleRadio}
                    justifyContent="between"
                  >
                    <FormControlLabel
                      value="payment"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.primary.main,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Payment"
                    />
                    <FormControlLabel
                      value="receipt"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.primary.main,
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                          }}
                        />
                      }
                      label="Receipt"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    multiline
                    id="remarks"
                    label="Remarks"
                    rows="6"
                    value={values.remarks}
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChange}
                  />
                </Grid>
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
                        onClick={handleUpdateBrs}
                        startIcon={<SaveIcon />}
                        loading={clicked}
                      >
                        Save Details
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>
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

export default BrsDetails;
