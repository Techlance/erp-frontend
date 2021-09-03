import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

// material-ui
import { IconButton, Stack } from "@material-ui/core";
import { formatDate } from "../../../../utils";
import EditAmendDialog from "./EditAmendDialog";

// project imports
import useAuth from "../../../../hooks/useAuth";
import useLC from "../../../../hooks/useLC";

// assets
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import EditIcon from "@material-ui/icons/EditTwoTone";

import CustomDataGrid from "../../../../ui-component/CustomDataGrid";
import MainCard from "../../../../ui-component/cards/MainCard";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";

//-----------------------|| User List ||-----------------------//
const AmendmentDetails = () => {
  const { user } = useAuth();
  const { lc_id, mid } = useParams();
  const { getLCAmend, deleteLCAmend } = useLC();

  const { lc_amend } = useSelector((state) => state.lc);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState({
    lc_id: lc_id,
    amendment_no: 1,
    issue_date: "",
    LDS: "",
    expiry_date: "",
    lc_amount: "",
    remarks: "",
    company_master_id: mid,
    created_by: user.email,
  });

  const handleDeleteAmend = async () => {
    if (value.id === 0) return;

    await deleteLCAmend(value.id, lc_id);

    // history.replace(`company/${mid}/master/lc/import/${lc_id}`);
  };

  const columns = [
    {
      field: "amendment_no",
      headerName: "Amend No.",
      flex: 0.4,
      minWidth: 150,
    },
    {
      field: "issue_date",
      headerName: "Issue Date",
      flex: 0.4,
      minWidth: 150,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "LDS",
      headerName: "LDS",
      flex: 0.5,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "expiry_date",
      headerName: "Expiry Date",
      flex: 0.4,
      minWidth: 148,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "lc_amount",
      headerName: "LC Amount",
      type: "number",
      minWidth: 125,
      flex: 0.4,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "created_by",
      headerName: "Created By",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "created_on",
      headerName: "Created On",
      flex: 0.3,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "",
      headerName: "Action",
      flex: 1,
      minWidth: 10,

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
                // setAmendID(row.id);
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

  useEffect(() => {
    setLoading(true);
    getLCAmend(lc_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lc_amend) setLoading(false);
    else setLoading(true);
  }, [lc_amend]);

  return (
    <>
      <MainCard>
        <CustomDataGrid columns={columns} rows={lc_amend} loading={loading} />
      </MainCard>
      <ConfirmDeleteDialog
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this LC Amendment? Once deleted the data can not be retrived!"
        handleAgree={handleDeleteAmend}
      />
      <EditAmendDialog
        open={showEditModal}
        handleClose={() => setShowEditModal(false)}
        data={value}
      />
    </>
  );
};

export default AmendmentDetails;
