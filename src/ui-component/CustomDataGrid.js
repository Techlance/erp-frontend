/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@emotion/react";

// material-ui
import { Box, Pagination } from "@material-ui/core";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  useGridSlotComponentProps,
  GridOverlay,
} from "@mui/x-data-grid";

import LinearProgress from "@material-ui/core/LinearProgress";

const CustomToolBar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();
  const classes = useStyles();
  return (
    <Pagination
      className={classes.root}
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const CustomDataGrid = (props) => {
  const { columns, rows, loading } = props;
  const theme = useTheme();

  let disp_rows = rows ? rows : [];

  useEffect(() => {
    disp_rows = rows ? rows : [];
  }, [rows]);

  return (
    <Box
      height={600}
      width="100%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          "& .MuiDataGrid-cell": {
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary + 15
                : "grey.200",
          },
          "& .MuiDataGrid-columnsContainer": {
            color: theme.palette.mode === "dark" ? "grey.600" : "grey.900",
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary + 15
                : "grey.200",
          },
          "& .MuiDataGrid-columnSeparator": {
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary + 15
                : "grey.200",
          },
          "& .MuiDataGrid-footerContainer": {
            marginTop: "16px",
            justifyContent: "left",
          },
          // '& .MuiDataGrid-toolbarContainer':{
          //   justifyContent:'flex-end'
          // }
        },
      }}
    >
      <DataGrid
        {...props}
        rows={disp_rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        density="comfortable"
        components={{
          Toolbar: CustomToolBar,
          Pagination: CustomPagination,
          LoadingOverlay: CustomLoadingOverlay,
        }}
        loading={loading}
      />
    </Box>
  );
};

CustomDataGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.oneOfType([PropTypes.array, null]).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CustomDataGrid;
