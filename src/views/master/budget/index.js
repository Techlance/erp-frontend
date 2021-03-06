import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import { gridSpacing } from "../../../store/constant";
import useBudget from "../../../hooks/useBudget";
import MainCard from "../../../ui-component/cards/MainCard";
import { formatDate } from "../../../utils";

// assets
import AnimateButton from "../../../ui-component/extended/AnimateButton";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../ui-component/CustomDataGrid";
import AddIcon from "@material-ui/icons/AddCircleTwoTone";
import A from "../../../components/master/budget/AddBudgetDialog";

//-----------------------|| Budget List ||-----------------------//
const SelectGroup = () => {
  const { pathname } = useLocation();
  const { mid } = useParams();

  const { company_budgets } = useSelector((state) => state.budget);
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
          href={`${pathname}/${
            params.row.budget_type === "P&L" ? "pl" : "cashflow"
          }/${params.value}`}
        >
          <Typography align="center">More</Typography>
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
      headerName: "Enforce Restrictions",
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
            <Typography variant="h3">Budgets</Typography>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowAddModal(true)}
                startIcon={<AddIcon />}
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
      <A
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
      />
    </MainCard>
  );
};

export default SelectGroup;
