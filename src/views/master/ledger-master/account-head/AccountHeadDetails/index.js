import React, { useState, useEffect } from "react";

// material-ui
import {
  Button,
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  makeStyles,
} from "@material-ui/core";

// project imports
import ConfirmDeleteDialog from "../../../../../components/ConfirmDeleteDialog";
import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";

// assets
import { gridSpacing } from "../../../../../store/constant";
import SubCard from "../../../../../ui-component/cards/SubCard";
import AnimateButton from "../../../../../ui-component/extended/AnimateButton";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";
import config from "../../../../../config";
import useLedgerMaster from "../../../../../hooks/useLedgerMaster";
import HeadTitleSelect from "../../../../../components/master/ledger-master/HeadTitleSelect";
import MainCard from "../../../../../ui-component/cards/MainCard";

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

const UserForm = () => {
  const history = useHistory();
  const classes = useStyles();

  const { company_account_heads } = useSelector((state) => state.ledgerMaster);

  const { getCompanyAccountHeads, updateCompanyAccountHead, deleteCompanyAccountHead } = useLedgerMaster();

  const { aid, mid } = useParams()

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [values, setValues] = useState(null);

  const [clicked, setClicked] = useState(false);

  const [error,setError] = useState(false);

  const handleChange = (event) => {
    if(event.target.id==="schedule_no"){
      console.log(event.target.value)
      if(company_account_heads.find(acc=>acc.schedule_no===parseInt(event.target.value))){
        setError(true)
      }
      else{
        setError(false)
      }
    }
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
      if(company_account_heads){
          let account_head = company_account_heads.find(acc=>acc.id === parseInt(aid) )
          if(account_head && account_head?.is_fixed===false){
              setValues(account_head)
          }
          else{
            history.replace(config.defaultPath)
          }
      }
      else{
        getCompanyAccountHeads(mid);
      }
  }, [company_account_heads]);

  const handleUpdateAccountHead = async () => {
    setClicked(true);
    await updateCompanyAccountHead(values);
    setClicked(false);
  };

  return (
    values && <MainCard title="User Details">
    <div className={classes.root}>
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item sm={12} md={8}>
        <SubCard title="Edit User Details">
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
            <FormControlLabel
              control={
                <Switch
                  id="bs"
                  checked={values.bs}
                  onChange={handleChecked}
                  name="bs"
                  color="primary"
                />
              }
              label="Balance Sheet"
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
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateAccountHead}
                        startIcon={<SaveIcon />}
                        disabled={clicked}
                      >
                        Save Details
                      </Button>
                    </AnimateButton>
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
          deleteCompanyAccountHead(values.id);
          history.replace(`/company/${mid}/master/ledger-master/head/`);
        }}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this Account Head? Once deleted the data can not be retrived!"
      />
    </Grid>
    </div>
    </MainCard>
  );
};

export default UserForm;
