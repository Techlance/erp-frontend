import React from "react";

// material-ui
import { Autocomplete, Grid, Stack, TextField } from "@material-ui/core";

// assets
import { gridSpacing } from "../../../../store/constant";
import SaveIcon from "@material-ui/icons/SaveRounded";
import LoadingButton from "../../../../ui-component/LoadingButton";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";
import CashFlowAutoSelect from "../../../../components/master/budget/CashFlowAutoSelect";

//-----------------------|| CashFlow Grid ||-----------------------//

const CashFlowGrid = ({ rows, edited, setEdited, handleUpdate }) => {
  const handleEdit = (model) => {
    // console.log(model);
    // console.log(rows);
    setEdited(model);
  };

  const columns = [
    {
      field: "cashflow_head",
      headerName: "Cash Flow Head",
      flex: 0.3,
      headerAlign: "left",
      align: "left",
      minWidth: 320,
      editable: true,
      renderCell: (params) => <CashFlowAutoSelect params={params} />,
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
              loading={false}
              onEditRowsModelChange={handleEdit}
              editRowsModel={edited}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row">
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <LoadingButton
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    startIcon={<SaveIcon />}
                    loading={false}
                  >
                    Save Details
                  </LoadingButton>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CashFlowGrid;
