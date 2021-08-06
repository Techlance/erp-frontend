import React, { useState, useEffect } from "react";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Grid
} from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useCompany from "../../hooks/useCompany";

const AddCurrenyDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { current_company, createCompanyDoc } = useCompany();
  const [values, setValues] = useState({
    created_by: user.email,
    doc_name: "",
    company_master_id: current_company.id,
    file:null
  });
  console.log(values)
  useEffect(()=>{
    setValues({
        ...values,
        company_master_id:current_company.id,
        created_by:user.email
    })
  },[current_company,user])
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
    console.log(values)
  };

  const handleUpload = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.files[0]
    });
  };

  const handleCloseModal = () => {
    setValues({
        created_by: "",
        doc_name: "",
        company_master_id: "",
        file:null
    });
    handleClose();
  };

  const handleSubmit = () => {
    console.log(values)
    if(!values.file)
        return
    createCompanyDoc(values);
    handleCloseModal();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-document"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Upload Document</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Upload A {current_company.company_name} related Document.</Typography>
        </DialogContentText>
            <Grid container>
                <Grid item>
                    <TextField
                        fullWidth
                        id="doc_name"
                        label="Document Name"
                        value={values.registration_no}
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <input type="file" id="file" onChange={handleUpload}/>
                </Grid>
            </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCurrenyDialog;
