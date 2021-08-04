import PropTypes from "prop-types";
import React from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Grid, Typography } from "@material-ui/core";

// project imports
import useCompany from "../../../hooks/useCompany";
import Avatar from "./../../../ui-component/extended/Avatar";
import MainCard from "./../../../ui-component/cards/MainCard";
import { gridSpacing } from "./../../../store/constant";
import formatDate from "../../../utils/format-date";
import config from "../../../config";
import useAuth from "../../../hooks/useAuth";

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
  const { companies } = useCompany();
  const { user } = useAuth();

  return (
    <MainCard title={title} content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing}>
          {/* <pre>{JSON.stringify(companies, null, 2)}</pre> */}
          {companies.map((company) => (
            <Grid item xs={12} key={company.company_id}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <div className={classes.userCoverMain}>
                    <Avatar src={`${config.media_uri}${company.logo}`}>
                      <BusinessCenter />
                    </Avatar>
                  </div>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Grid container spacing={1}>
                    <Grid item xs zeroMinWidth>
                      <Typography align="left" variant="body2">
                        {company.company_name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography align="left" variant="caption">
                        {formatDate(company.created_on)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </CardContent>
    </MainCard>
  );
};

SelectCompany.propTypes = {
  title: PropTypes.string,
};

export default SelectCompany;
