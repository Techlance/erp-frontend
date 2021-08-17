import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

// material-ui
import { Button, Grid, Stack, TextField, makeStyles } from "@material-ui/core";

// project imports
import useLedgerMaster from "../../../hooks/useLedgerMaster";
import { gridSpacing } from "../../../store/constant";
import SubCard from "../../../ui-component/cards/SubCard";
import AccountHeadSelect from "../../../components/master/ledger-master/AccountHeadSelect";
import ParentGroupSelect from "../../../components/master/ledger-master/ParentGroupSelect";
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

  const { company_account_group_details, company_account_groups } = useSelector(
    (state) => state.ledgerMaster
  );

  const {
    getCompanyAccountGroups,
    getCompanyAccountGroupDetails,
    updateCompanyAccountGroup,
    deleteCompanyAccountGroup,
  } = useLedgerMaster();

  const { gid, mid } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [values, setValues] = useState(null);
  const [clicked, setClicked] = useState(false);

  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [checkList, setCheckList] = useState({});

  const handleChange = (event) => {
    if (event.target.id === "group_code") {
      console.log(event.target.value);
      if (
        company_account_groups?.find(
          (acc) =>
            acc.group_code === event.target.value &&
            company_account_group_details.group_code !== event.target.value
        )
      ) {
        setError(true);
      } else {
        setError(false);
      }
      if (event.target.value.length > 4) return null;
    }
    if (event.target.id === "group_name") {
      console.log(event.target.value);
      if (
        company_account_groups?.find(
          (acc) =>
            acc.group_name === event.target.value &&
            company_account_group_details.group_name !== event.target.value
        )
      ) {
        setNameError(true);
      } else {
        setNameError(false);
      }
    }
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

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
    if (company_account_group_details) {
      setCheckList({
        Ledgers: company_account_group_details.ledger_master,
      });
      setValues({ ...company_account_group_details });
    } else {
      getCompanyAccountGroupDetails(gid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_account_group_details]);

  useEffect(() => {
    if (!company_account_groups) getCompanyAccountGroups(mid);
  });

  const handleUpdateAccountGroup = async () => {
    setClicked(true);
    let form = { ...values };
    form.acc_head_id = parseInt(form.acc_head_id.id);
    form.child_of = parseInt(form.child_of.id);
    await updateCompanyAccountGroup(form);
    setClicked(false);
  };

  const handleAgree = () => {
    deleteCompanyAccountGroup(values.id);
    history.replace(`/company/${mid}/master/ledger-master/group/`);
  };

  return (
    values && (
      <MainCard title="Account Group Details">
        <div className={classes.root}>
          <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item sm={12} md={8}>
              <SubCard title="Edit Account Group">
                <Grid container spacing={gridSpacing}>
                  {/* <pre>{JSON.stringify(values,null,2)}</pre> */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="group_name"
                      label="Group Name"
                      value={values.group_name}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                      error={nameError}
                      helperText={
                        nameError && "This Group Name Already Exists."
                      }
                      InputProps={{
                        readOnly: values?.is_fixed,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="group_code"
                      label="Group Code"
                      value={values.group_code}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                      error={error}
                      helperText={error && "This Group Code Already Exists."}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <AccountHeadSelect
                      captionLabel="Account Head"
                      InputLabelProps={{ shrink: true }}
                      selected={values.acc_head_id}
                      onChange={handleSelect}
                      disabled={values?.is_fixed}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ParentGroupSelect
                      captionLabel="Parent Group"
                      InputLabelProps={{ shrink: true }}
                      selected={values.child_of}
                      onChange={handleSelect}
                      disabled={
                        values?.acc_head_id === null || values?.is_fixed
                      }
                      head_id={values.acc_head_id?.id}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row">
                      <Grid
                        container
                        justifyContent="flex-end"
                        spacing={gridSpacing}
                      >
                        <Grid item>
                          <AnimateButton>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => setShowDeleteModal(true)}
                              startIcon={<DeleteIcon />}
                              disabled={values.is_fixed}
                            >
                              Delete
                            </Button>
                          </AnimateButton>
                        </Grid>
                        <Grid item>
                          <LoadingButton
                            variant="contained"
                            color="primary"
                            onClick={handleUpdateAccountGroup}
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
