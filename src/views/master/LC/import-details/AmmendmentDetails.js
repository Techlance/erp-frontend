import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// material-ui

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../store/constant";

// assets
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import EditIcon from "@material-ui/icons/EditTwoTone";

// import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";
import { useLocation, useParams } from "react-router";
import { number } from "prop-types";
import formatDate from "../../../../utils";
import useLC from "../../../../hooks/useLC";
import { IconButton, Stack } from "@material-ui/core";
import useAuth from "../../../../hooks/useAuth";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";
import EditAmendDialog from "./EditAmendDialog";

//-----------------------|| User List ||-----------------------//
const AmendmentDetails = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { lc_id, mid } = useParams();

  const { user } = useAuth();

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

  const { lc_amend } = useSelector((state) => state.lc);

  const { getLCAmend, deleteLCAmend } = useLC();

  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();

  // const [currentAmendID, setAmendID] = useState(0);

  const handleDeleteAmend = async () => {
    if (value.id === 0) return;

    await deleteLCAmend(value.id, lc_id);

    // history.replace(`company/${mid}/master/lc/import/${lc_id}`);
  };

  const columns = [
    // {
    //   field: "id",
    //   headerName: "Edit",
    //   flex: 0.2,
    //   headerAlign: "left",
    //   align: "left",
    //   renderCell: (params) => (
    //     <Button
    //       variant="text"
    //       color="primary"
    //       aria-label="more-details"
    //       // onClick={(row) => handleCompanyClick(row.company_id)}
    //       href={`${pathname}/${params.value}`}
    //     >
    //       <Typography align="center">More </Typography>
    //       <IconArrowRight sx={{ fontSize: "1.1rem" }} />
    //     </Button>
    //   ),
    // },
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
      type: number,
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
