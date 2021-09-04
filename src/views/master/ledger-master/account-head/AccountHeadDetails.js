import React, { useState, useEffect } from "react";

// material-ui
import { Button, Grid, Stack, TextField, makeStyles } from "@material-ui/core";

// project imports
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

// assets
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import config from "../../../../config";
import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import HeadTitleSelect from "../../../../components/master/ledger-master/HeadTitleSelect";
import MainCard from "../../../../ui-component/cards/MainCard";
import ProtectedDeleteDialog from "../../../../components/ProtectedDeleteDialog";
import LoadingButton from "../../../../ui-component/LoadingButton";

//-----------------------|| User Form ||-----------------------//

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
  const { aid, mid } = useParams();

  const { company_account_heads } = useSelector((state) => state.ledgerMaster);

  const {
    getCompanyAccountHeads,
    updateCompanyAccountHead,
    deleteCompanyAccountHead,
  } = useLedgerMaster();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [values, setValues] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const [checkList, setCheckList] = useState({});

  const handleChange = (event) => {
    if (event.target.id === "schedule_no") {
      if (
        company_account_heads.find(
          (acc) => acc.schedule_no === parseInt(event.target.value)
        )
      ) {
        setError(true);
      } else {
        setError(false);
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
    if (company_account_heads) {
      let account_head = company_account_heads.find(
        (acc) => acc.id === parseInt(aid)
      );
      if (account_head && account_head?.is_fixed === false) {
        setValues(account_head);
        setCheckList({
          "Account Groups": account_head.acc_group,
        });
      } else {
        history.replace(config.defaultPath);
      }
    } else {
      getCompanyAccountHeads(mid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_account_heads]);

  const handleUpdateAccountHead = async () => {
    setClicked(true);
    let form = { ...values };
    form.schedule_no = parseInt(values.schedule_no);
    form.bs = form.title === "ASSETS" || form.title === "EQUITY AND LIABLITIES";
    await updateCompanyAccountHead(form);
    setClicked(false);
  };

  return (
    values && (
      <MainCard title="Account Head Details">
        <div className={classes.root}>
          <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item sm={12} md={8}>
              <SubCard title="Account Head Details">
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="schedule_no"
                      label="Schedule Number"
                      value={values.schedule_no}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                      type="number"
                      error={error}
                      helperText={error && "This Schedule No. Already Exists."}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <HeadTitleSelect
                      captionLabel="Title"
                      InputLabelProps={{ shrink: true }}
                      selected={values.title}
                      onChange={handleSelect}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      id="acc_head_name"
                      label="Accound Head Name"
                      value={values.acc_head_name}
                      InputLabelProps={{ shrink: true }}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row">
                      <Grid
                        container
                        justifyContent="space-between"
                        spacing={gridSpacing}
                      >
                        <Grid item>
                          <AnimateButton>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => setShowDeleteModal(true)}
                              startIcon={<DeleteIcon />}
                              disabled={clicked}
                            >
                              Delete
                            </Button>
                          </AnimateButton>
                        </Grid>
                        <Grid item>
                          <LoadingButton
                            variant="contained"
                            color="primary"
                            onClick={handleUpdateAccountHead}
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
              handleAgree={() => {
                deleteCompanyAccountHead(values.id, mid);
                history.replace(`/company/${mid}/master/ledger-master/head/`);
              }}
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
