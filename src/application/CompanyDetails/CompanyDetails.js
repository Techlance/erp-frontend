import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardActions, CardContent, Divider, Grid, Tab, Tabs, Typography, Avatar } from '@material-ui/core';

// project imports
import UserProfile from './CompanyProfile';
// import Billing from './Billing';
// import Payment from './Payment';
// import ChangePassword from './ChangePassword';
import MainCard from '../../ui-component/cards/MainCard';
import AnimateButton from '../../ui-component/extended/AnimateButton';
import { gridSpacing } from '../../store/constant';

// assets
import Avatar1 from './../../assets/images/users/user-round.svg';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// style constant
const useStyles = makeStyles((theme) => ({
    profileTab: {
        '& .MuiTabs-flexContainer': {
            borderBottom: 'none'
        },
        '& button': {
            color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
            minHeight: 'auto',
            minWidth: '100%',
            padding: '12px 16px'
        },
        '& button.Mui-selected': {
            color: theme.palette.primary.main,
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
        },
        '& button > span': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start'
        },
        '& button > span > svg': {
            marginBottom: '0px !important',
            marginRight: '10px',
            marginTop: '10px',
            height: '20px',
            width: '20px'
        },
        '& button > span > div > span': {
            display: 'block'
        },
        '& button > span > span + svg': {
            margin: '0px 0px 0px auto !important',
            width: '14px',
            height: '14px'
        },
        '& > div > span': {
            display: 'none'
        }
    },
    cardPanels: {
        borderLeft: '1px solid',
        borderLeftColor: theme.palette.mode === 'dark' ? '#333d5e' : '#eeeeee',
        height: '100%'
    }
}));

// tabs
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <div>{children}</div>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: 'CREATE',
        icon: <AddCircleIcon fontSize="large"/>,
        caption: 'Add A New Company'
    },
    {
        label: 'Company Name 1',
        icon: <Avatar src = {Avatar1}/>,
        caption: 'Created On: MM-DD-YYYY'
    },
    {
        label: 'Company Name 2',
        icon: <Avatar src = {Avatar1}/>,
        caption: 'Created On: MM-DD-YYYY'
    },
    {
        label: 'Company Name 3',
        icon: <Avatar src = {Avatar1}/>,
        caption: 'Created On: MM-DD-YYYY'
    },
    {
        label: 'Company Name 3',
        icon: <Avatar src = {Avatar1}/>,
        caption: 'Created On: MM-DD-YYYY'
    },
    {
        label: 'Company Name 3',
        icon: <Avatar src = {Avatar1}/>,
        caption: 'Created On: MM-DD-YYYY'
    },
    {
        label: 'Company Name 4',
        icon: <Avatar src = {Avatar1}/>,
        caption: 'Created On: MM-DD-YYYY'
    }
];

//-----------------------|| PROFILE 2 ||-----------------------//

const CompanyDetails = () => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard title="Account Settings" content={false}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={4}>
                            <CardContent>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    orientation="vertical"
                                    className={classes.profileTab}
                                    variant="scrollable"
                                    sx={{
                                        '& button': {
                                            borderRadius: customization.borderRadius + 'px'
                                        }
                                    }}
                                >
                                    {tabsOption.map((tab, index) => (
                                        <Tab
                                            key={index}
                                            icon={tab.icon}
                                            label={
                                                <Grid container direction="column">
                                                    <Typography variant="subtitle1" color="inherit">
                                                       <span style={{margin:"0 10px"}}>{tab.label}</span> 
                                                    </Typography>
                                                    <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                                                    <span style={{margin:"0 10px"}}>{tab.caption}</span> 
                                                    </Typography>
                                                </Grid>
                                            }
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <CardContent className={classes.cardPanels}>
                                {tabsOption.map((x,index)=>
                                    {return (
                                        <TabPanel value={value} index={index}>
                                            <UserProfile />
                                        </TabPanel>
                                    )})
                                }
                            </CardContent>
                        </Grid>
                    </Grid>
                    <Divider />
                    <CardActions>
                        <Grid container justifyContent="space-between" spacing={0}>
                            <Grid item>
                                {value > 0 && (
                                    <AnimateButton>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            color="primary"
                                            onClick={(e) => handleChange(e, parseInt(value) - 1)}
                                        >
                                            Back
                                        </Button>
                                    </AnimateButton>
                                )}
                            </Grid>
                            <Grid item>
                                {/* {value < 3 && ( */}
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            color="primary"
                                            onClick={(e) => handleChange(e, 1 + parseInt(value))}
                                        >
                                            {value===0?"Create":"Update"}
                                        </Button>
                                    </AnimateButton>
                                {/* )} */}
                            </Grid>
                        </Grid>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default CompanyDetails;
