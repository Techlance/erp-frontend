import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "../../../ui-component/cards/MainCard";
import formatDate from "../../../utils/format-date";

// assets
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../ui-component/CustomDataGrid";
import useBudget from "../../../hooks/useBudget";
import { gridSpacing } from "../../../store/constant";
import AddBudgetDialog from "../../../components/master/budget/addBudgetDialog";

//-----------------------|| Budget List ||-----------------------//
const SelectGroup = () => {
  const { pathname } = useLocation();
  const { mid } = useParams();

  const { company_budgets } = useSelector((state) => state.budget);
  const { company } = useSelector((state) => state.companyMaster);
  const { getCompanyBudget } = useBudget();

  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      flex: 0.2,
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
          <Typography align="center">More </Typography>
          <IconArrowRight sx={{ fontSize: "1.1rem" }} />
        </Button>
      ),
    },
    {
      field: "budget_name",
      headerName: "Budget Name",
      flex: 0.3,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "budget_type",
      headerName: "Budget Type",
      flex: 0.5,
    },
    {
      field: "year_id",
      headerName: "Budget Year",
      flex: 0.4,
      valueFormatter: (params) => {
        return `${params.value.start_date} - ${params.value.end_date}`;
      },
    },
    {
      field: "authoriser",
      headerName: "Authoriser",
      flex: 0.4,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        return `${params.value.email}`;
      },
    },
    {
      field: "enforce_restrictions",
      headerName: "enforce_restrictions",
      flex: 0.3,
      type: "boolean",
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        return `${params.value.email}`;
      },
    },
    {
      field: "created_on",
      headerName: "Created On",
      type: "date",
      flex: 0.3,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "created_by",
      headerName: "created By",
      flex: 0.3,
    },
  ];

  useEffect(() => {
    getCompanyBudget(mid);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mid]);

  useEffect(() => {
    if (company_budgets) setLoading(false);
    else setLoading(true);
  }, [company_budgets]);

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
              {`${company?.company_name}'s Budgets`}
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
                Add Budget
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <CustomDataGrid
        columns={columns}
        rows={company_budgets}
        loading={loading}
      />
      <AddBudgetDialog
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
      />
    </MainCard>
  );
};

export default SelectGroup;
