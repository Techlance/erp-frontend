import React, { useEffect } from "react";

// material-ui
import { Grid, Stack } from "@material-ui/core";

// project import
import { gridSpacing } from "../../../../store/constant";
import useRequest from "../../../../hooks/useRequest";
import CashFlowAutoSelect from "../../../../components/master/budget/CashFlowAutoSelect";

// assets
import SaveIcon from "@material-ui/icons/SaveRounded";
import LoadingButton from "../../../../ui-component/LoadingButton";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";
import CashflowTypeSelect from "../../../../components/master/budget/CashflowTypeSelect";

//-----------------------|| CashFlow Grid ||-----------------------//

// const data = [
//   {
//     id: 1,
//     head: "receipt1",
//     created_by: "jainam@gmail.com",
//     created_on: "2021-09-02T14:28:48.181005Z",
//   },
//   {
//     id: 2,
//     head: "receipt2",
//     created_by: "jainam@gmail.com",
//     created_on: "2021-09-02T14:28:48.181005Z",
//   },
//   {
//     id: 3,
//     head: "payment1",
//     created_by: "jainam@gmail.com",
//     created_on: "2021-09-02T19:53:42.635736Z",
//   },
//   {
//     id: 5,
//     head: "payment2",
//     created_by: "jainam@gmail.com",
//     created_on: "2021-09-02T20:01:37.032799Z",
//   },
//   {
//     id: 6,
//     head: "payment3",
//     created_by: "jainam@gmail.com",
//     created_on: "2021-09-02T20:01:37.032799Z",
//   },
// ];

// function renderAuto(params) {
//   return <TextField readOnly value={params.value} />;
// }

// function RatingEditInputCell({ id, value, api, field }) {

//   const handleChange = (event) => {
//     api.setEditCellValue({ id, field, value: Number(event.target.value) }, event);
//     if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
//       api.commitCellChange({ id, field });
//       api.setCellMode(id, field, 'view');
//     }
//   };

//   const handleRef = (element) => {
//     if (element) {
//       element.querySelector(`input[value="${value}"]`).focus();
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Rating
//         ref={handleRef}
//         name="rating"
//         precision={1}
//         value={value}
//         onChange={handleChange}
//       />
//     </div>
//   );
// }

// function renderAutoEditInputCell(params) {
//   return <RatingEditInputCell {...params} />;
// }

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
    console.log(id, field, value);
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
      field: "budget_type",
      headerName: "Budget Type",
      flex: 0.3,
      headerAlign: "left",
      align: "left",
      minWidth: 320,
      renderCell: (params) => (
        <CashflowTypeSelect
          params={params}
          options={["payment", "receipt"]}
          loading={loading}
        />
      ),
    },
    {
      field: "cashflow_head",
      headerName: "Cash Flow Head",
      flex: 0.3,
      headerAlign: "left",
      align: "left",
      minWidth: 320,
      renderCell: (params) => (
        <CashFlowAutoSelect params={params} options={data} loading={loading} />
      ),
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
