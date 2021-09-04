import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import useVoucherTypes from "../../../hooks/useVoucherTypes";
import MainCard from "../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../store/constant";
import AddVoucherType from "../../../components/master/voucher-types/AddVoucherTypeDialog";
import { formatDate } from "../../../utils";

// assets
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../ui-component/CustomDataGrid";

//-----------------------|| Voucher Type List ||-----------------------//

const VoucherTypes = () => {
  const { pathname } = useLocation();
  const [{ company }, { voucher_types }] = useSelector((state) => [
    state.companyMaster,
    state.voucherTypes,
  ]);

  const { getVoucherTypes } = useVoucherTypes();

  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

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
      align: "center",
      headerAlign: "center",
    },
    {
      field: "authorization_id",
      headerName: "Authorization ID",
      flex: 0.5,
      valueFormatter: (params) => {
        return params.value?.email || "No Auth Required";
      },
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "auto_numbering",
      headerName: "Auto Numbering",
      flex: 0.2,
      type: "boolean",

      minWidth: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "prefix",
      headerName: "Prefix",
      flex: 0.2,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "restart",
      headerName: "Restart",
      flex: 0.2,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "created_on",
      headerName: "Created On",
      type: "date",
      flex: 0.5,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 0.5,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
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
            <Typography variant="h3">Voucher Types</Typography>
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
      <CustomDataGrid
        columns={columns}
        rows={voucher_types}
        loading={loading}
      />
      <AddVoucherType
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
