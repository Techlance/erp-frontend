import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { IconButton, Stack } from "@material-ui/core";

// assets
import EditIcon from "@material-ui/icons/EditTwoTone";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

// project imports
import EditCurrenyDialog from "./EditCurrencyDialog";
import useCompany from "../../../hooks/useCompany";
import { formatDate } from "../../../utils/index";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import CustomDataGrid from "../../../ui-component/CustomDataGrid";

//-----------------------|| Company List ||-----------------------//

const CurrencyTable = () => {
  const company = useSelector((state) => state.company);
  const { currencies } = company;

  const { getCurrency, deleteCurrency } = useCompany();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    id: 0,
    created_by: "",
    currency_name: "",
    currency: "",
  });

  useEffect(() => {
    const f = async () => {
      setLoading(true);
      await getCurrency();
      setLoading(false);
    };

    f();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteCurrency = async () => {
    if (value.id === 0) return;

    await deleteCurrency(value.id);
  };

  const columns = [
    {
      field: "currency_name",
      headerName: "Currency Name",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "currency",
      flex: 1,
      headerName: "Currency Code",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "created_on",
      headerName: "Created On",
      flex: 1,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        return <>{formatDate(params.value)}</>;
      },
    },
    {
      field: "",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row" justifyContent="center" alignItems="center">
            <IconButton
              onClick={() => {
                setValue(params.row);
                setShowEditModal(true);
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
            <IconButton
              onClick={() => {
                setValue(params);
                setShowDeleteModal(true);
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <CustomDataGrid
        columns={columns}
        rows={currencies}
        loading={loading}
        disableColumnMenu
      />
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
    </>
  );
};

export default CurrencyTable;
