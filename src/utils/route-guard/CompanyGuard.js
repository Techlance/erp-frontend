import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// project imports
import config from "../../config";
import useComapanyMaster from "../../hooks/useCompanyMaster";

//-----------------------|| Company Guard ||-----------------------//

/**
 * Authorization `company` guard for routes
 * @param {PropTypes.node} children children element/node
 */
const CompanyGuard = ({ children }) => {
  const { company } = useComapanyMaster();

  console.log("in CompanyGuard.js", !company);

  if (!company) {
    console.log("Redirecting...");
    return <Redirect to={config.defaultPath} />;
  }

  return children;
};

CompanyGuard.propTypes = {
  children: PropTypes.node,
};

export default CompanyGuard;
