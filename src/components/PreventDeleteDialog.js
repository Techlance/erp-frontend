import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import LoadingButton from "../ui-component/LoadingButton";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

// assets
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ViewCompactTwoToneIcon from "@material-ui/icons/ViewCompactTwoTone";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

// style constant
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const PreventDeleteDialog = ({ open, handleClose, checkList }) => {
  const classes = useStyles();
  const keys = Object.keys(checkList);
  const [openNest, setOpenNest] = useState(
    keys.map(() => {
      return true;
    })
  );
  const handleClick = (index) => {
    let newNest = openNest.map((nest, i) => {
      if (index === i) return !nest;
      return nest;
    });
    setOpenNest(newNest);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 3 }}
        fullWidth={true}
        maxWidth="sm"
        scroll="paper"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h4" color="error">
            Deletion Not Permitted
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Deletion of this record is not permitted due to its existing related
            records.
          </DialogContentText>
          <DialogContentText>
            To delete this record please delete the below child records first.
          </DialogContentText>
          {keys.map((key, index) => (
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              className={classes.root}
            >
              <ListItem button onClick={() => handleClick(index)}>
                <ListItemIcon>
                  <ViewCompactTwoToneIcon sx={{ fontSize: "1.3rem" }} />
                </ListItemIcon>
                <ListItemText primary={key} />
                {openNest[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openNest[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {checkList[key].map((sub) => (
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <FiberManualRecordIcon sx={{ fontSize: "0.5rem" }} />
                      </ListItemIcon>
                      <ListItemText primary={sub} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          ))}
        </DialogContent>
        <DialogActions sx={{ pr: 2.5 }}>
          <LoadingButton
            onClick={handleClose}
            color="primary"
            variant="contained"
          >
            Okay
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PreventDeleteDialog;
