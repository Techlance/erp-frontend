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
  Grid,
  Avatar
} from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useCompany from "../../hooks/useCompany";
import { gridSpacing } from "../../store/constant";
const style = {
  borderRadius:"12px",
  border:"1px solid "
}

const ImageUpdateDialog = ({ open, handleClose }) => {
  const { user } = useAuth();
  const { current_company, updateCompany } = useCompany();
  const [values, setValues] = useState(null);
  const [img, setimg] = useState(null);
  console.log(values)

  const handleUpload = (event) => {
    setValues(event.target.files[0]);
    src(event.target.files[0]);
  };

  const handleCloseModal = () => {
    setValues(null);
    setimg(null);
    handleClose();
  };

  const handleSubmit = () => {
    console.log(values)
    updateCompany({
      ...current_company,
      logo:values
    })
    handleCloseModal();
  };
  const src = (val)=>{
      var reader = new FileReader();
      reader.onload = function (e) {
          setimg(e.target.result)
      };
      reader.readAsDataURL(val);
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-document"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">Update Logo</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body2">Upload A Logo for {current_company.company_name}.</Typography>
        </DialogContentText>
            <Grid container spacing={gridSpacing}>
                <Grid item sm={12} xs={12}>
                  <Avatar alt="Company Logo" style={{height:"100px",width:"100px"}} src={img}/>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <div >
                    <input type="file" id="file" onChange={handleUpload}/>
                  </div>
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

export default ImageUpdateDialog;
