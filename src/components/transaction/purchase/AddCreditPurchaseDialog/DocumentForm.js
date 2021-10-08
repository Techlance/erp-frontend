import React, { useEffect, useState } from "react";

// material-ui
import {
  Fab,
  Button,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";

// project imports
import useAuth from "../../../../hooks/useAuth";
import { gridSpacing } from "../../../../store/constant";

// assets
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { IconFileDownload } from "@tabler/icons";

function buildFileSelector() {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.setAttribute("multiple", "multiple");
  return fileSelector;
}

const DocumentForm = ({ handleNext, setErrorIndex, values, setValues }) => {
  const { user } = useAuth();

  const fileSelector = buildFileSelector();

  useEffect(() => {
    setValues({
      ...values,
      created_by: user.email,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleChecked = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const onDownload = (row) => {
    const link = document.createElement("a");
    link.download = `${row.doc_name}.pdf`;
    link.target = "_blank";
    link.href = row.file;

    link.click();
  };

  const handleFileSelect = (event) => {
    fileSelector.click();
  };

  const handleUpload = (event) => {
    setValues({
      ...values,
      files: [
        ...values.files,
        {
          id: values.files.length,
          filename: event.target.files[0].name,
          file: event.target.files[0],
        },
      ],
    });
  };

  fileSelector.onchange = handleUpload;

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item md={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography align="left" variant="h4">
                  Document Name
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography align="center" variant="h4">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values.files?.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs zeroMinWidth>
                      <Typography
                        align="left"
                        variant="subtitle1"
                        component="div"
                      >
                        {row.filename}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell align="center">
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Tooltip placement="top" title="Download">
                      <IconButton
                        variant="outlined"
                        color="primary"
                        aria-label="download"
                        onClick={() => onDownload(row)}
                      >
                        <IconFileDownload sx={{ fontSize: "1.3rem" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip placement="top" title="Delete">
                      <IconButton
                        variant="outlined"
                        color="primary"
                        aria-label="delete"
                        onClick={() => {}}
                      >
                        <DeleteTwoToneIcon
                          color="error"
                          sx={{ fontSize: "1.3rem" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Grid item md={12}>
          <Grid container direction="row-reverse">
            <Grid item>
              <Fab size="small" color="primary" onClick={handleFileSelect}>
                <AddRoundedIcon size="small" />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DocumentForm;