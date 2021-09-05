import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// material ui
import {
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

// assets
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import { IconFileDownload } from "@tabler/icons";

// project imports
import useCompany from "../../../hooks/useCompany";
import { formatDate } from "../../../utils";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import { useSelector } from "react-redux";

const CompanyDocumentForm = () => {
  const { cid } = useParams();

  const { current_company_docs } = useSelector((state) => state.company);
  const { getSelectedCompanyDocs, deleteCompanyDoc } = useCompany();

  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [currentDocID, setCurrentDocID] = useState(0);

  const onDownload = (row) => {
    const link = document.createElement("a");
    link.download = `${row.doc_name}.pdf`;
    link.target = "_blank";
    link.href = row.file;

    link.click();
  };

  useEffect(() => {
    getSelectedCompanyDocs(cid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAgree = async () => {
    await deleteCompanyDoc(currentDocID, cid);
  };

  return (
    <div>
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
          {current_company_docs.map((row, index) => (
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
    </div>
  );
};
export default CompanyDocumentForm;
