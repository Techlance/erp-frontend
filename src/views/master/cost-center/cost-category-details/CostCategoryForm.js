import React, { useState, useEffect } from "react";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Stack, TextField } from "@material-ui/core";

import { useHistory, useParams } from "react-router";

// assets
import { gridSpacing } from "../../../../store/constant";
import SubCard from "../../../../ui-component/cards/SubCard";
import AnimateButton from "../../../../ui-component/extended/AnimateButton";

// project imports
import useCostCenter from "../../../../hooks/useCostCenter";
import ConfirmDeleteDialog from "../../../../components/ConfirmDeleteDialog";
import { useSelector } from "react-redux";

// style constant
const useStyles = makeStyles((theme) => ({
  accountAvatar: {
    width: "100px",
    height: "100px",
    margin: "0 auto",
  },
  accountContent: {
    textAlign: "center",
  },
}));

//-----------------------|| Cost Category Form ||-----------------------//

const CostCategoryForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const { cost_category } = useSelector((state) => state.costCenter);
  const { getCostCategory, updateCostCategory, deleteCostCategory } =
    useCostCenter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [values, setValues] = useState({ ...cost_category });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  //   const handleFileUpload = (event) => {
  //     setValues({
  //       ...values,
  //       logo: event.target.files[0],
  //     });
  //   };

  const { cat_id, mid } = useParams();

  useEffect(() => {
    if (cost_category) {
      let category = cost_category.find((cat) => cat.id === parseInt(cat_id));
      console.log(category);
      console.log(cost_category);
      console.log(cat_id);

      if (category) {
        setValues(category);
      } else {
        // history.replace(config.defaultPath);
        console.log("obj");
      }
    } else {
      getCostCategory(mid);
    }
  }, [cost_category]);

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item sm={6} md={8}>
        <SubCard title="Edit Cost Category">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
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
                <Grid container spacing={3}>
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          updateCostCategory(values);
                        }}
                      >
                        Update Details
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
      <ConfirmDeleteDialog
        open={showDeleteModal}
        handleAgree={() => {
          deleteCostCategory(values.id);
          history.replace(`/company/${mid}/master/cost-center/cost-category`);
        }}
        handleClose={() => setShowDeleteModal(false)}
        title="Are you sure?"
        body="Are you sure you want to delete this Cost Category records? Once deleted the data can not be retrived!"
      />
    </Grid>
  );
};

export default CostCategoryForm;
