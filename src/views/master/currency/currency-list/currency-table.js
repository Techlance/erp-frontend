import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import {
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

// assets
import EditIcon from "@material-ui/icons/EditTwoTone";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

// project imports
import useCompany from "../../../../hooks/useCompany";
import formatDate from "../../../../utils/format-date";
import EditCurrenyDialog from "../EditCurrencyDialog";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";

//-----------------------|| Company List ||-----------------------//

const CurrencyTable = () => {
  const company = useSelector((state) => state.company);
  const { currencies } = company;

  const { getCurrency, deleteCurrency } = useCompany();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [value, setValue] = useState({
    id: 0,
    created_by: "",
    currency_name: "",
    currency: "",
  });

  useEffect(() => {
    getCurrency();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteCurrency = async () => {
    if (value.id === 0) return;

    await deleteCurrency(value.id);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h4">Currency Name</Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Currency Code
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Created On
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Edit
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {currencies.map((row, index) => (
          <TableRow hover key={row.id}>
            <TableCell>
              <Typography align="left" variant="subtitle1" component="div">
                {row.currency_name}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">{row.currency}</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">
                {formatDate(row.created_on)}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  onClick={() => {
                    setValue(row);
                    setShowEditModal(true);
                  }}
                >
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setValue(row);
                    setShowDeleteModal(true);
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <EditCurrenyDialog
        open={showEditModal}
        handleClose={() => setShowEditModal(false)}
        data={value}
      />

      <ConfirmDeleteDialog
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure you want to delete this Base Currency."
        body="Something"
        handleAgree={handleDeleteCurrency}
      />
    </Table>
  );
};

export default CurrencyTable;
