import React, { useEffect, useState } from "react";

// material ui
import {
  Fab,
  Grid,
  IconButton,
  makeStyles,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";

// assets
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { IconFileDownload } from "@tabler/icons";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

// project imports
import { formatDate } from "../../../utils";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import useRequest from "../../../hooks/useRequest";
import AddLCDocumentDialog from "./AddLCDocumentDialog";
import useLC from "../../../hooks/useLC";

const useStyles = makeStyles({
  root: {
    minHeight: "150px",
  },
});

const LCDocs = ({ newLC }) => {
  const classes = useStyles();
  const { deleteLcDoc } = useLC();
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [currentDocID, setCurrentDocID] = useState(0);
  const [newDocs, setNewDocs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const onDownload = (row) => {
    const link = document.createElement("a");
    link.download = `${row.doc_name}.pdf`;
    link.target = "_blank";
    link.href = row.file;

    link.click();
  };

  const [getLCDocs, , , data] = useRequest({
    url: `/lc/get-lc-document/${newLC?.id}`,
    initialState: [],
  });

  useEffect(() => {
    getLCDocs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddModal, deleteLcDoc]);

  useEffect(() => {
    console.log(data);
    setNewDocs(data);
  }, [data]);

  const handleAgree = async () => {
    await deleteLcDoc(currentDocID, newLC.id);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item md={12}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography align="left" variant="h4">
                  Document Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="h4">
                  Added By
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="center" variant="h4">
                  Added On
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                <Typography align="center" variant="h4">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newDocs?.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs zeroMinWidth>
                      <Typography
                        align="left"
                        variant="subtitle1"
                        component="div"
                      >
                        {row.doc_name}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography align="center">{row.created_by}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center">
                    {formatDate(row.created_on)}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
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
                        onClick={() => {
                          setCurrentDocID(row.id);
                          setShowDeleteModal(true);
                        }}
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
          <ConfirmDeleteDialog
            open={showDeleteModal}
            handleAgree={handleAgree}
            handleClose={() => setShowDeleteModal(false)}
            title="Are you sure?"
            body="Are you sure you want to delete this Document? Once deleted the data can not be retrived!"
          />
        </Table>
      </Grid>
      <Grid item md={12}>
        <Grid container direction="row-reverse">
          <Grid item>
            <Fab
              size="small"
              color="primary"
              onClick={() => {
                setShowAddModal(true);
              }}
            >
              <AddRoundedIcon size="small" />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
      <AddLCDocumentDialog
        open={showAddModal}
        handleClose={() => setShowAddModal(false)}
        newLC={newLC}
      />
    </Grid>
  );
};
export default LCDocs;
