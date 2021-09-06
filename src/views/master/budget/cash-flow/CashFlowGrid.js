import React, { useEffect, useState } from "react";

// material-ui
import {
  Grid,
  TextField,
  Autocomplete,
  createFilterOptions,
  Typography,
} from "@material-ui/core";

// project import
import { gridSpacing } from "../../../../store/constant";
import useRequest from "../../../../hooks/useRequest";

// assets
import SaveIcon from "@material-ui/icons/SaveRounded";
import CachedIcon from "@material-ui/icons/Cached";
import LoadingButton from "../../../../ui-component/LoadingButton";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";
import useBudget from "../../../../hooks/useBudget";
import useAuth from "../../../../hooks/useAuth";

//-----------------------|| CashFlow Grid ||-----------------------//
const filter = createFilterOptions();

function renderAuto(params) {
  return <Typography>{params.value?.head}</Typography>;
}

const handleSave = (id, field, event, newValue, api) => {
  api.setEditCellValue({ id, field, value: newValue }, event);
  if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
    api.commitCellChange({ id, field });
    api.setCellMode(id, field, "view");
  }
};

function AutoEditInputCell({
  id,
  value,
  api,
  field,
  data,
  loading,
  handleAddCashflowHead,
  getCashFlowHead,
}) {
  const handleChange = (event, newValue) => {
    if (typeof newValue === "string") {
      // toggleOpen(true);
      // setDialogValue({
      //   title: newValue,
      //   year: '',
      // });
      console.log("1 " + newValue);
      handleAddCashflowHead(newValue, async (data) => {
        await getCashFlowHead();
        handleSave(id, field, event, data, api);
      });
    } else if (newValue && newValue.inputValue) {
      // toggleOpen(true);
      // setDialogValue({
      //   title: newValue.inputValue,
      //   year: '',
      // });
      console.log("2 " + newValue.inputValue);
      handleAddCashflowHead(newValue.inputValue, async (data) => {
        await getCashFlowHead();
        handleSave(id, field, event, data, api);
      });
    } else {
      //     setValue(newValue);
      handleSave(id, field, event, newValue, api);
    }
    // }
  };

  return (
    <Autocomplete
      fullWidth
      inputRef={(input) => input && input.focus()}
      value={value}
      onChange={handleChange}
      id="cash-flow-cash-head"
      options={data}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.head;
        }
        return option.head;
      }}
      disabled={loading}
      InputProps={{
        startAdornment: <> {loading && <CachedIcon />} </>,
      }}
      renderInput={(params) => <TextField fullWidth {...params} />}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            head: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
    />
  );
}

function renderAutoEditInputCell(
  params,
  data,
  loading,
  handleAddCashflowHead,
  getCashFlowHead
) {
  return (
    <AutoEditInputCell
      {...params}
      data={data}
      loading={loading}
      handleAddCashflowHead={handleAddCashflowHead}
      getCashFlowHead={getCashFlowHead}
    />
  );
}

function renderAutoType(params) {
  return <Typography>{params.value}</Typography>;
}

function AutoEditInputCellType({ id, value, api, field }) {
  const handleChange = (event, newValue) => {
    handleSave(id, field, event, newValue, api);
  };

  return (
    <Autocomplete
      fullWidth
      inputRef={(input) => input && input.focus()}
      value={value}
      onChange={handleChange}
      id="cash-flow-cash-head"
      options={["Receipt", "Payment"]}
      getOptionLabel={(option) => option}
      renderInput={(params) => <TextField fullWidth {...params} />}
      // getOptionLabel={(option) => {
      //   // e.g value selected with enter, right from the input
      //   if (typeof option === 'string') {
      //     return option;
      //   }
      //   if (option.inputValue) {
      //     return option.inputValue;
      //   }
      //   return option.title;
      // }}
      // selectOnFocus
      // clearOnBlur
      // handleHomeEndKeys
    />
  );
}

function renderAutoEditInputCellType(params) {
  return <AutoEditInputCellType {...params} />;
}

const CashFlowGrid = ({ rows, edited, setEdited, handleUpdate, revise }) => {
  const [getCashFlowHead, loading, , data] = useRequest({
    url: "/budget/get-cashflow-head/",
    method: "GET",
    initialState: [],
  });

  const { user } = useAuth();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    getCashFlowHead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { addCashflowHead } = useBudget();
  const handleAddCashflowHead = (head, successFn) => {
    let data = {
      head: head,
      created_by: user.email,
    };
    addCashflowHead(data, successFn);
  };

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
      editable: !revise,
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
      editable: !revise,
      renderCell: renderAuto,
      renderEditCell: (params) => {
        return renderAutoEditInputCell(
          params,
          data,
          loading,
          handleAddCashflowHead,
          getCashFlowHead
        );
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

  const onClick = async () => {
    setClicked(true);
    await handleUpdate();
    setClicked(false);
  };

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
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={onClick}
              startIcon={<SaveIcon />}
              loading={loading || clicked}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CashFlowGrid;
