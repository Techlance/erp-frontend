import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

// material-ui
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// project imports
import useBRS from "../../../hooks/useBrs";
import MainCard from "../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../store/constant";
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import SelectBankSelect from "../../../components/master/brs/SelectBankSelect";
import formatDate from "../../../utils";

// assets
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../ui-component/CustomDataGrid";
import AddBrsDialog from "../../../components/master/brs/AddBrsDialog";

// style

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: "2rem 0",
    borderColor: theme.palette.primary.dark,
  },
}));

const BRS = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { company } = useSelector((state) => state.companyMaster);
  const { selected_bank, brs_list } = useSelector((state) => state.brs);

  const { getBanks, getOpeningBalBRS, setBank } = useBRS();
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (company) getBanks(company.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    if (selected_bank) getOpeningBalBRS(company.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_bank]);

  useEffect(() => {
    if (brs_list) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [brs_list, company]);

  const onChange = async (item) => {
    await setBank(item);
  };

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      minWidth: 100,
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
      field: "acc_code",
      headerName: "Account Code",
      minWidth: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => params.value.ledger_name,
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      minWidth: 200,
    },
    {
      field: "chq_no",
      headerName: "Cheque Number",
      headerAlign: "center",
      align: "center",
      minWidth: 180,
    },
    {
      field: "chq_date",
      headerName: "Cheque Date",
      headerAlign: "center",
      align: "center",
      minWidth: 180,
    },
    {
      field: "transaction_no",
      headerName: "Transaction Number",
      headerAlign: "center",
      align: "center",
      minWidth: 220,
    },
    {
      field: "transaction_date",
      headerName: "Transaction Date",
      headerAlign: "center",
      align: "center",
      minWidth: 200,
    },
    {
      field: "transaction_type",
      headerName: "Transaction Type",
      headerAlign: "center",
      align: "center",
      minWidth: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "created_on",
      headerName: "Created On",
      type: "date",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      minWidth: 150,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "created_by",
      headerAlign: "center",
      align: "center",
      headerName: "Created By",
      flex: 0.5,
      minWidth: 150,
    },
  ];

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
              {`${company?.company_name}'s BRS`}
            </Typography>
          </Grid>
          {brs_list && (
            <Grid item>
              <AnimateButton>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => setShowAddModal(true)}
                >
                  Add BRS
                </Button>
              </AnimateButton>
            </Grid>
          )}
        </Grid>
      }
      content={true}
    >
      <SelectBankSelect captionLabel="Select Bank" onChange={onChange} />
      {brs_list && (
        <>
          <Divider
            variant="middle"
            py={4}
            flexItem
            className={classes.divider}
          />
          <CustomDataGrid columns={columns} rows={brs_list} loading={loading} />
        </>
      )}
      <AddBrsDialog
        open={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
    </MainCard>
  );
};

export default BRS;
