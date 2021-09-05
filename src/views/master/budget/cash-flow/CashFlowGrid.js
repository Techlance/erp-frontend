import React, { useEffect } from "react";

// material-ui
import { Grid, Stack, TextField, Autocomplete } from "@material-ui/core";

// project import
import { gridSpacing } from "../../../../store/constant";
import useRequest from "../../../../hooks/useRequest";

// assets
import SaveIcon from "@material-ui/icons/SaveRounded";
import CachedIcon from "@material-ui/icons/Cached";
import LoadingButton from "../../../../ui-component/LoadingButton";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";

//-----------------------|| CashFlow Grid ||-----------------------//

function renderAuto(params) {
  return (
    <TextField
      inputProps={{ readOnly: true }}
      fullWidth
      value={params.value?.head}
    />
  );
}

function AutoEditInputCell({ id, value, api, field, data, loading }) {
  const handleChange = (event, newValue) => {
    api.setEditCellValue({ id, field, value: newValue }, event);
    if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
      api.commitCellChange({ id, field });
      api.setCellMode(id, field, "view");
    }
  };

  return (
    <Autocomplete
      fullWidth
      inputRef={(input) => input && input.focus()}
      value={value}
      onChange={handleChange}
      id="cash-flow-cash-head"
      options={data}
      getOptionLabel={(option) => option.head}
      disabled={loading}
      InputProps={{
        startAdornment: <> {loading && <CachedIcon />} </>,
      }}
      renderInput={(params) => <TextField fullWidth {...params} />}
    />
  );
}

function renderAutoEditInputCell(params, data, loading) {
  return <AutoEditInputCell {...params} data={data} loading={loading} />;
}

function renderAutoType(params) {
  return (
    <TextField
      inputProps={{ readOnly: true }}
      fullWidth
      value={params.value}
    />
  );
}

function AutoEditInputCellType({ id, value, api, field }) {
  const handleChange = (event, newValue) => {
    api.setEditCellValue({ id, field, value: newValue }, event);
    if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
      api.commitCellChange({ id, field });
      api.setCellMode(id, field, "view");
    }
  };

  return (
    <Autocomplete
      fullWidth
      inputRef={(input) => input && input.focus()}
      value={value}
      onChange={handleChange}
      id="cash-flow-cash-head"
      options={["Receipt","Payment"]}
      getOptionLabel={(option) => option}
      renderInput={(params) => <TextField fullWidth {...params} />}
    />
  );
}

function renderAutoEditInputCellType(params) {
  return <AutoEditInputCellType {...params} />;
}

const CashFlowGrid = ({ rows, edited, setEdited, handleUpdate }) => {
  const [getCashFlowHead, loading, , data] = useRequest({
    url: "/budget/get-cashflow-head/",
    method: "GET",
    initialState: [],
  });

  useEffect(() => {
    getCashFlowHead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = ({ id, field, value }) => {
    let editedCopy = [...edited];
    editedCopy = editedCopy.map((e) => {
      return { ...e };
    });
    let row = rows.find((row) => row.id === id);
    let edit = editedCopy.find((row) => row.id === id);
    if (edit && (row[field] === value || row[field]?.id === value?.id)) {
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
      field: "budget_type",
      headerName: "Budget Type",
      flex: 0.3,
      editable: true,
      headerAlign: "left",
      align: "left",
      minWidth: 320,
      renderCell: renderAutoType,
      renderEditCell: (params) => {
        return renderAutoEditInputCellType(params);
      },
    },
    {
      field: "cashflow_head",
      headerName: "Cash Flow Head",
      flex: 0.3,
      headerAlign: "left",
      align: "left",
      minWidth: 320,
      editable: true,
      renderCell: renderAuto,
      renderEditCell: (params) => {
        return renderAutoEditInputCell(params, data, loading);
      },
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
      {/* <pre>{JSON.stringify(edited, null, 2)}</pre>
      <pre>{JSON.stringify(rows, null, 2)}</pre> */}
      <Grid item sm={12} md={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <CustomDataGrid
              columns={columns}
              rows={rows}
              loading={loading}
              onCellEditCommit={handleEdit}
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
                    loading={loading}
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
