import React,{useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tab, Tabs } from '@material-ui/core';
import {useParams} from 'react-router-dom'
import useCompany from '../../../../hooks/useCompany';

// project imports
import CompanyForm from './CompanyForm';
import MainCard from '../../../../ui-component/cards/MainCard';

// style constant
const useStyles = makeStyles((theme) => ({
    accountTab: {
        marginBottom: '24px',
        '& button': {
            minWidth: '100px'
        },
        '& a': {
            minHeight: 'auto',
            minWidth: '10px',
            padding: '12px 8px',
            marginRight: '18px',
            color: theme.palette.grey[600]
        },
        '& a.Mui-selected': {
            color: theme.palette.primary.main
        }
    }
}));

// tabs
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box p={0}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

//-----------------------|| PROFILE 3 ||-----------------------//

const CompanyDetails = () => {
    const classes = useStyles();
    const {cid} = useParams();

    const {getSelectedCompany} = useCompany();
    useEffect(()=>{
        if(!cid)
            return
        getSelectedCompany(cid)
    },[])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard title="Account">
            <div className={classes.root}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    onChange={handleChange}
                    className={classes.accountTab}
                    aria-label="simple tabs example"
                    variant="scrollable"
                >
                    <Tab component={RouterLink} to="#" label="Profile" {...a11yProps(0)} />
                    <Tab component={RouterLink} to="#" label="Docs" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <CompanyForm />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CompanyForm />
                </TabPanel>
            </div>
        </MainCard>
    );
};

export default CompanyDetails;
