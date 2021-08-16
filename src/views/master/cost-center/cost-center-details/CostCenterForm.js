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
import CategorySelect from "../../../../components/CostCenter/CategorySelect";
import ParentGroupSelect from "../../../../components/CostCenter/ParentGroupSelect";

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

//-----------------------|| Cost Center Form ||-----------------------//

const CostCenterForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const { cost_center_details, cost_center } = useSelector(
    (state) => state.costCenter
  );

  const {
    getCostCenter,
    getCostCenterDetails,
    updateCostCenter,
    deleteCostCenter,
  } = useCostCenter();

  const { cen_id, mid } = useParams();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [values, setValues] = useState(null);
  const [clicked, setClicked] = useState(false);

  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [checkList, setCheckList] = useState({});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value,
    });
  };

  const handleSelect = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  useEffect(() => {
    if (cost_center_details) {
      setCheckList({
        // Ledgers: cost_center_details.ledger_master,
      });
      setValues({ ...cost_center_details });
    } else getCostCenterDetails(cen_id);
  }, [cost_center_details]);

  useEffect(() => {
    if (!cost_center) getCostCenter(mid);
  });

  const handleUpdateCostCenter = async () => {
    setClicked(true);
    let form = { ...values };
    form.cost_category_id = parseInt(form.cost_category_id.id);
    form.child_of = parseInt(form.child_of.id);
    console.log(form);
    await updateCostCenter(form);
    setClicked(false);
  };

  return (
    values && (
      <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item sm={6} md={8}>
          <SubCard title="Edit Cost Center">
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <CategorySelect
                  captionLabel="Cost Category"
                  InputLabelProps={{ shrink: true }}
                  selected={values.cost_category_id}
                  onChange={handleSelect}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ParentGroupSelect
                  fullWidth
                  id="child_of"
                  captionLabel="Child Of"
                  selected={values.child_of}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleSelect}
                  disabled={values.cost_category_id === null}
                  cat_id={values.cost_category_id?.id}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="cost_center_name"
                  label="Cost Center Name"
                  value={values.cost_center_name}
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
                            handleUpdateCostCenter();
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
            deleteCostCenter(values.id);
            history.replace(`/company/${mid}/master/cost-center/center`);
          }}
          handleClose={() => setShowDeleteModal(false)}
          title="Are you sure?"
          body="Are you sure you want to delete this Cost Center records? Once deleted the data can not be retrived!"
        />
      </Grid>
    )
  );
};

export default CostCenterForm;
