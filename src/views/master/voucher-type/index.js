import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../store/constant";

// assets
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import useVoucherTypes from "../../../hooks/useVoucherTypes";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../ui-component/CustomDataGrid";
import useCompanyMaster from "../../../hooks/useCompanyMaster";
import formatDate from "../../../utils/format-date";
import AddAccountGroupDialog from "../../../components/master/ledger-master/AddAccountGroupDialog";

//-----------------------|| User List ||-----------------------//
const VoucherTypes = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const { voucher_types } = useSelector((state) => state.voucherTypes);

  const { company } = useCompanyMaster();

  const { getVoucherTypes } = useVoucherTypes();

  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          aria-label="more-details"
          href={`${pathname}/${params.value}`}
          // target="_blank"
        >
          <Typography align="center">Edit </Typography>
          <IconArrowRight sx={{ fontSize: "1.1rem" }} />
        </Button>
      ),
    },
    {
      field: "voucher_name",
      headerName: "Voucher Name",
      flex: 0.5,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "voucher_class",
      headerName: "Voucher Class",
      flex: 0.5,
      minWidth: 300,
    },
    {
      field: "authorization_id",
      headerName: "Authorization ID",
      flex: 0.5,
      minWidth: 200,
    },
    {
      field: "auto_numbering",
      headerName: "Auto Numbering",
      flex: 0.2,
      minWidth: 300,
    },
    {
      field: "prefix",
      headerName: "Prefix",
      flex: 0.2,
      minWidth: 150,
    },
    {
      field: "restart",
      headerName: "Restart",
      flex: 0.2,
      minWidth: 150,
    },
    {
      field: "created_on",
      headerName: "Created On",
      type: "date",
      flex: 0.5,
      minWidth: 150,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 0.5,
      minWidth: 150,
    },
  ];

  useEffect(() => {
    getVoucherTypes(company.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    if (voucher_types) setLoading(false);
    else setLoading(true);
  }, [voucher_types, company]);

  return (
    <MainCard
      title={
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={gridSpacing}
        >
          <Grid item>
            <Typography variant="h3">
              {`${company?.company_name}'s Voucher Types`}
            </Typography>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowAddModal(true)}
              >
                Add Voucher Type
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <pre>{JSON.stringify(voucher_types, null, 2)}</pre>
      <CustomDataGrid
        columns={columns}
        rows={voucher_types}
        loading={loading}
      />
      <AddAccountGroupDialog
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
      />
    </MainCard>
  );
};

export default VoucherTypes;

// Authorization ID
// Prefix
// Auto Number
// Restart