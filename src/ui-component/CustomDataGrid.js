import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/styles';

// material-ui
import { Box, Pagination } from '@material-ui/core';
import { DataGrid,GridToolbarContainer , GridToolbarExport, GridToolbarFilterButton, GridToolbarColumnsButton, useGridSlotComponentProps, GridOverlay} from '@material-ui/data-grid';
import { useTheme } from '@emotion/react';
import LinearProgress from '@material-ui/core/LinearProgress';

const CustomToolBar = ()=>{
  return(
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent:'flex-end'
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

const AccountHeadGrid = ({ columns, rows, loading }) => {
    const theme = useTheme();
    // const columns = []
    //   const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //   ];
    let disp_rows = rows?rows:[]
    useEffect(()=>{
      if(!rows)
        disp_rows = []
      else
        disp_rows = rows
    },[rows])
  return (
    <Box
    height={400}
    width="100%"
    sx={{
        '& .MuiDataGrid-root': {
            border: 'none',
            '& .MuiDataGrid-cell': {
                borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            },
            '& .MuiDataGrid-columnsContainer': {
                color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            },
            '& .MuiDataGrid-columnSeparator': {
                color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
            },
            '& .MuiDataGrid-footerContainer':{
              justifyContent:'left'
            },
            // '& .MuiDataGrid-toolbarContainer':{
            //   justifyContent:'flex-end'
            // }
        }
    }}
    >
        <DataGrid
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

export default AccountHeadGrid;
