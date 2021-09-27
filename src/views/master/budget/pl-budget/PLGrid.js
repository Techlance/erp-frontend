import React, { useState } from "react";

// material-ui
import { gridSpacing } from "../../../../store/constant";
import { Button, Grid } from "@material-ui/core";
//renamed
// assets
import CheckIcon from "@material-ui/icons/CheckCircleTwoTone";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";
import ConfirmSaveDialog from "../../../../components/ConfirmSaveDialog";

//-----------------------|| Ledger Form ||-----------------------//

const PLGrid = ({ rows, loading, edited, setEdited, handleUpdate }) => {
  const [openSave, setOpenSave] = useState(false);

  const [sortModel] = useState([
    {
      field: "ledger_id",
      sort: "asc",
    },
  ]);

  const handleEdit = ({ id, field, value }) => {
    let editedCopy = [...edited];
    editedCopy = editedCopy.map((e) => {
      return { ...e };
    });
    let row = rows.find((row) => row.id === id);
    let edit = editedCopy.find((row) => row.id === id);
    if (edit && row[field] === value) {
      if (edit[field]) delete editedCopy[editedCopy.indexOf(edit)][field];
      else editedCopy[editedCopy.indexOf(edit)][field] = value;
    } else if (edit) {
      editedCopy[editedCopy.indexOf(edit)][field] = value;
    } else {
      editedCopy.push({
        id: id,
        [field]: value,
      });
    }
    setEdited(editedCopy);
  };

  const columns = [
    {
      field: "ledger_id",
      headerName: "Ledger",
      flex: 0.3,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "jan",
      headerName: "Jan",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "feb",
      headerName: "Feb",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "mar",
      headerName: "Mar",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "apr",
      headerName: "Apr",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "may",
      headerName: "May",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "jun",
      headerName: "Jun",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "jul",
      headerName: "Jul",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "aug",
      headerName: "Aug",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "sep",
      headerName: "Sep",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "octo",
      headerName: "Oct",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "nov",
      headerName: "Nov",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
    {
      field: "dec",
      headerName: "Dec",
      flex: 0.1,
      headerAlign: "left",
      align: "left",
      minWidth: 120,
      editable: true,
    },
  ];

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item sm={12} md={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <CustomDataGrid
              columns={columns}
              rows={rows}
              loading={loading}
              onCellEditCommit={handleEdit}
              sortModel={sortModel}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenSave(true)}
              startIcon={<CheckIcon />}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmSaveDialog
        open={openSave}
        title="Are you sure you want to save?"
        handleAgree={handleUpdate}
        handleClose={() => setOpenSave(false)}
      />
    </Grid>
  );
};

export default PLGrid;
