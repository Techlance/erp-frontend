import React,{useState} from 'react';

// material-ui
import { Button, Grid, Typography } from '@material-ui/core';

// project imports
import UserList from './UserList';
import MainCard from '../../../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../../../store/constant';
import AnimateButton from '../../../../../ui-component/extended/AnimateButton'
import AddCompanyDialog from '../../../../../components/company/AddCompanyDialog'

// assets


//-----------------------|| USER LIST STYLE 1 ||-----------------------//

const CompanyList = () => {

    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">List</Typography>
                    </Grid>
                    <Grid item>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={() => setShowCreateModal(true)}
                      >
                          Add Document
                      </Button>
                    </AnimateButton>
                    </Grid>
                </Grid>
            }
            content={false}
        >
            <UserList />
            <AddCompanyDialog
                open={showCreateModal}
                handleClose={()=>{setShowCreateModal(false)}}
            />
        </MainCard>
    );
};

export default CompanyList;
