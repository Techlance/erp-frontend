import PropTypes from "prop-types";
import React from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Grid, Typography } from "@material-ui/core";

// project imports
import Avatar from "./../../../ui-component/extended/Avatar";
import MainCard from "./../../../ui-component/cards/MainCard";
import { gridSpacing } from "./../../../store/constant";

// assets
import BusinessCenter from "@material-ui/icons/BusinessCenter";

// style constant
const useStyles = makeStyles((theme) => ({
  userCoverMain: {
    position: "relative",
  },
}));

//================================|| Company List ||================================//

const SelectCompany = ({ title }) => {
  const classes = useStyles();

  return (
    <MainCard title={title} content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <div className={classes.userCoverMain}>
                  <Avatar color="primary">
                    <BusinessCenter />
                  </Avatar>
                </div>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="body2">
                      You have 3 pending tasks.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="left" variant="caption">
                      Just Now
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <div className={classes.userCoverMain}>
                  <Avatar color="error">
                    <BusinessCenter />
                  </Avatar>
                </div>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="body2">
                      New order received
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="left" variant="caption">
                      Just Now
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <div className={classes.userCoverMain}>
                  <Avatar color="success">
                    <BusinessCenter />
                  </Avatar>
                </div>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="body2">
                      You have 3 pending tasks.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="left" variant="caption">
                      Just Now
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <div className={classes.userCoverMain}>
                  <Avatar color="primary">
                    <BusinessCenter />
                  </Avatar>
                </div>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="body2">
                      New order received
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="left" variant="caption">
                      Just Now
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <div className={classes.userCoverMain}>
                  <Avatar color="warning">
                    <BusinessCenter />
                  </Avatar>
                </div>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Grid container spacing={1}>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" variant="body2">
                      Order cancelled
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="left" variant="caption">
                      Just Now
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

SelectCompany.propTypes = {
  title: PropTypes.string,
};

export default SelectCompany;
