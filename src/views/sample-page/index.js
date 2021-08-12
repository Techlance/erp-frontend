import React from "react";

// material-ui
import { Typography } from "@material-ui/core";

// project imports
import MainCard from "../../ui-component/cards/MainCard";

import CustomDataGrid from "../../ui-component/CustomDataGrid";

//==============================|| SAMPLE PAGE ||==============================//

const SamplePage = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, "firstName") || ""} ${
          params.getValue(params.id, "lastName") || ""
        }`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <MainCard title="Sample Card">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion
        tempos incident ut laborers et doolie magna alissa. Ut enif ad minim
        venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea
        commons construal. Duos aube grue dolor in reprehended in voltage veil
        esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate
        non president, sunk in culpa qui officiate descent molls anim id est
        labours.
      </Typography>

      <br />
      <br />

      <CustomDataGrid columns={columns} rows={rows} loading={false} />
    </MainCard>
  );
};

export default SamplePage;
