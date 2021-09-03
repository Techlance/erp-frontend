import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

// material-ui
import { Button, Grid, Stack, TextField } from "@material-ui/core";

// assets
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import SaveIcon from "@material-ui/icons/SaveRounded";

// project imports
import useCostCenter from "../../../../hooks/useCostCenter";
import { useSelector } from "react-redux";
import config from "../../../../config";
import ProtectedDeleteDialog from "../../../../components/ProtectedDeleteDialog";
import LoadingButton from "../../../../ui-component/LoadingButton";

//-----------------------|| Cost Category Form ||-----------------------//

const CostCategoryForm = () => {
  const history = useHistory();

  const { cost_category } = useSelector((state) => state.costCenter);
  const { getCostCategory, updateCostCategory, deleteCostCategory } =
    useCostCenter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [values, setValues] = useState({ ...cost_category });
  const [clicked, setClicked] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const { cat_id, mid } = useParams();

  const [checkList, setCheckList] = useState({});

  useEffect(() => {
    if (cost_category) {
      let category = cost_category.find((cat) => cat.id === parseInt(cat_id));

      if (category) {
        setValues(category);
        setCheckList({
          cost_center: category.cost_center,
        });
      } else {
        history.replace(config.defaultPath);
      }
    } else {
      getCostCategory(mid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cost_category]);

  const handleUpdateCostCategory = async () => {
    setClicked(true);
    await updateCostCategory(values);
    history.replace(`/company/${mid}/master/cost-center/category`);
    setClicked(false);
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item sm={6} md={8}>
        <SubCard title="Edit Cost Category">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="name"
                label="Cost Category Name"
                value={values.name}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row">
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setShowDeleteModal(true);
                        }}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateCostCategory}
                      loading={clicked}
                      startIcon={<SaveIcon />}
                    >
                      Update Details
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <ProtectedDeleteDialog
        checkList={checkList}
        showDeleteModal={showDeleteModal}
        handleAgree={() => {
          deleteCostCategory(values.id);
          history.replace(`/company/${mid}/master/cost-center/category`);
        }}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this Cost Category records? Once deleted the data can not be retrived!"
      />
    </Grid>
  );
};

export default CostCategoryForm;
