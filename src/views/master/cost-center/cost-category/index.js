import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../store/constant";
import formatDate from "../../../../utils/format-date";
import useCostCenter from "../../../../hooks/useCostCenter";
import AddCostCategoryDialog from "../../../../components/CostCenter/AddCostCategoryDialog";

// assets
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from "../../../../ui-component/CustomDataGrid";

//-----------------------|| User List ||-----------------------//

const SelectGroup = () => {
  const { pathname } = useLocation();

  const [{ cost_category }, { company }] = useSelector((state) => [
    state.costCenter,
    state.companyMaster,
  ]);

  const { getCostCategory } = useCostCenter();

  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      field: "id",
      headerName: "Edit",
      flex: 0.2,
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Button
          variant="text"
          color="primary"
          aria-label="more-details"
          // onClick={(row) => handleCompanyClick(row.company_id)}
          href={`${pathname}/${params.value}`}
        >
          <Typography align="center">More </Typography>
          <IconArrowRight sx={{ fontSize: "1.1rem" }} />
        </Button>
      ),
    },
    {
      field: "name",
      headerName: "Cost Category Name",
      flex: 0.5,
    },
    {
      field: "created_by",
      headerName: "Created By",
      flex: 0.4,
    },
    {
      field: "created_on",
      headerName: "Created On",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    getCostCategory(company?.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    // console.log(company_account_heads);
    if (cost_category) setLoading(false);
    else setLoading(true);
  }, [cost_category]);

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
              {`${company?.company_name}'s Cost Category`}
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
                Add Cost Category
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <CustomDataGrid
        columns={columns}
        rows={cost_category}
        loading={loading}
      />
      <AddCostCategoryDialog
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
        // user_id={current_user_account.id}
      />
    </MainCard>
  );
};

export default SelectGroup;
