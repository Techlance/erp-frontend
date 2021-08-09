import React from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Grid, Typography } from "@material-ui/core";

// project imports
import useAuth from "../../hooks/useAuth";
import useCompany from "../../hooks/useCompany";
import { gridSpacing } from "./../../store/constant";
import config from "../../config";

// assets
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import Avatar from "./../../ui-component/extended/Avatar";
import MainCard from "./../../ui-component/cards/MainCard";
import { useSelector } from "react-redux";

// style constant
const useStyles = makeStyles((theme) => ({
  userCoverMain: {
    position: "relative",
  },
}));

//================================|| Company List ||================================//

const SelectCompany = ({ title }) => {
  const classes = useStyles();
  const company = useSelector((state)=>state.company)
  const { companies } = company;
  const { user } = useAuth();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <MainCard title="Select a Company">
          <Grid item xs={6}>
            <CardContent>
              <Grid container spacing={gridSpacing}>
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
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <pre>{JSON.stringify({ user, companies }, null, 2)}</pre>
            </CardContent>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default SelectCompany;
