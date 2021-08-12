import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { Button, Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../store/constant";

// assets
import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import AccountHeadGrid from "./AccountHeadGrid";
import AccountHeadGridTrial from "./AccountHeadGridTrial";
import formatDate from "../../../../utils/format-date";
import useLedgerMaster from "../../../../hooks/useLedgerMaster";
import CompanyTable from "../../../company/company-list/company-table";
import { IconArrowRight } from "@tabler/icons";
import CustomDataGrid from '../../../../ui-component/CustomDataGrid'

//-----------------------|| User List ||-----------------------//
const SelectGroup = () => {

  const [showAddModal, setShowAddModal] = useState(false);

  const [company,ledgerMaster] = useSelector((state)=>[state.company,state.ledgerMaster])

  const {master_company} = company;

  const { company_account_heads } = ledgerMaster;

  const { getCompanyAccountHeads } = useLedgerMaster()

  const [loading,setLoading] = useState(true)

  const columns = [
    { 
      field: 'id', 
      headerName: 'Edit', 
      flex:0.2,
      type:'number',
      headerAlign:'left',
      align:'left',
      renderCell:(params) => (
        params.row['is_fixed']?<Button
        variant="text"
        color="primary"
        aria-label="more-details"
        // onClick={(row) => handleCompanyClick(row.company_id)}
        href={`/admin/user-manager/users/${params.value}`}
        target="_blank"
      >
        <Typography align="center">More </Typography>
        <IconArrowRight sx={{ fontSize: "1.1rem" }} />
      </Button>
      :<Button disabled>
        Not Editable
      </Button>
      ),
    },
    {
      field: 'schedule_no', 
      headerName: 'Schedule No.', 
      flex:0.3,
      type:'number',
      headerAlign:'left',
      align:'left'
    },
    {
      field: 'acc_head_name',
      headerName: 'Account Head Name',
      flex:0.5,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex:0.4,
    },
    {
      field: 'bs',
      headerName: 'BS',
      type: 'boolean',
      flex:0.3,
      headerAlign:'center',
      align:'center'
    },
  ];

  useEffect(()=>{
    setLoading(true)
    getCompanyAccountHeads(master_company?.company_id)
  },[master_company])

  useEffect(()=>{
    console.log(company_account_heads)
    if(company_account_heads)
      setLoading(false)
    else
      setLoading(true)
  },[company_account_heads])

  return (
    <MainCard
      title={
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={gridSpacing}
        >
          <Grid item>
            <Typography variant="h3">
              {`${master_company.company_name}'s Account Heads`}
            </Typography>
          </Grid>
          <Grid item>
            <AnimateButton>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => setShowAddModal(true)}
              >
                Add Account Head
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      }
      content={true}
    >
      <CustomDataGrid columns={columns} rows={company_account_heads} loading={loading}/>
      {/* <AccountHeadGridTrial /> */}
      {/* <AddUserCompanyGroup
        open={showAddModal}
        handleClose={() => {
          setShowAddModal(false);
        }}
        user_id={current_user_account.id}
      /> */}
    </MainCard>
  );
};

export default SelectGroup;
