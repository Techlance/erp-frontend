import React, { useEffect } from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// project imports
import config from "../../config";

// assets
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import Avatar from "./../../ui-component/extended/Avatar";
import MainCard from "./../../ui-component/cards/MainCard";
import { useSelector } from "react-redux";
// import useComapanyMaster from "../../hooks/useCompanyMaster";

// style constant
const useStyles = makeStyles((theme) => ({
  userCoverMain: {
    position: "relative",
  },
  gridContainer: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    borderColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

//================================|| Company List ||================================//

const SelectCompany = ({ title }) => {
  const classes = useStyles();
  const company = useSelector((state) => state.company);
  // const { setMasterCompany } = useComapanyMaster();
  const { companies } = company;

  const [anchorEl, setAnchorEl] = React.useState([null * companies?.length]);
  const open = anchorEl.map((anc) => {
    return Boolean(anc);
  });
  const handleClick = (event, index) => {
    console.log(index);
    let copy = [...anchorEl];
    copy[index] = event.currentTarget;
    setAnchorEl(copy);
  };
  const handleClose = () => {
    setAnchorEl([null * companies?.length]);
  };

  useEffect(() => {
    setAnchorEl([null * companies?.length]);
  }, [companies]);

  // useEffect(() => {
  //   setMasterCompany(master_company);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [master_company]);

  // const handleSelectCompanyMaster = (index) => {
  //   setMasterCompany(companies[index]);
  // };
  const handleSelectCompanyMaster = (id, year) => {
    const newWindow = window.open(
      // `/company/${companies[index].company_id}/master/ledger-master/head`,
      `/company/${id}/${year}/master/ledger-master/head`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
    handleClose();
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <MainCard title="Select a Company" content={false}>
          <Grid item xs={12}>
            <CardContent>
              {companies?.map((company, index) => (
                <Grid
                  key={company.company_id}
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  className={classes.gridContainer}
                  // onClick={() => handleSelectCompanyMaster(index)}
                  // onClick={()=>handleClick(this)}
                >
                  <Grid item xs={2} zeroMinWidth>
                    <div className={classes.userCoverMain}>
                      <Avatar src={`${config.media_uri}${company.logo}`}>
                        <BusinessCenter />
                      </Avatar>
                    </div>
                  </Grid>

                  <Grid item xs={8} zeroMinWidth>
                    <Typography align="left" variant="h4">
                      {company.company_name}
                    </Typography>
                  </Grid>

                  <Grid item xs={2} zeroMinWidth flexGrow>
                    <IconButton color="primary" aria-label="Select Year">
                      <ArrowForwardIcon
                        onClick={(e) => {
                          handleClick(e, index);
                        }}
                      />
                    </IconButton>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl[index]}
                      open={open[index]}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      {company.years.map((year) => (
                        <MenuItem
                          onClick={() => {
                            handleSelectCompanyMaster(
                              company.company_id,
                              year.year_id
                            );
                          }}
                        >
                          {year.start_date + " - " + year.end_date}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default SelectCompany;
