import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";

// project imports
import config from "../../config";
import useComapanyMaster from "../../hooks/useCompanyMaster";
import useRequest from "../../hooks/useRequest";
import Loader from "../../ui-component/Loader";

//-----------------------|| Company Guard ||-----------------------//

/**
 * Authorization `company` guard for routes
 * @param {PropTypes.node} children children element/node
 */
const CompanyGuard = ({ children }) => {
  const { setMasterCompany } = useComapanyMaster();

  const { mid } = useParams();

  console.log("Inside Company Guard")

  const [getCompanies, loading, , companies] = useRequest({
    url:'/company/get-user-company',
    method:'GET',
    initialState:[]
  })

  useEffect(()=>{
    getCompanies();
  },[])

  if(loading){
    return <Loader />
  }
  console.log(companies)
  // const company = companies.companies.find(company=>company.company_id===mid)
  // if(company){
  //   setMasterCompany(company);
  //   return children;
  // }
  return children
  return <Redirect to={config.defaultPath} />
};

CompanyGuard.propTypes = {
  children: PropTypes.node,
};

export default CompanyGuard;
