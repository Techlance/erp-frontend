import React from "react";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";

// project imports
import config from "../../config";
// import useComapanyMaster from "../../hooks/useCompanyMaster";

//-----------------------|| Company Guard ||-----------------------//

/**
 * Authorization `company` guard for routes
 * @param {PropTypes.node} children children element/node
 */
const CompanyGuard = ({ children }) => {
  // const { company } = useComapanyMaster();

  const { mid } = useParams();

  console.log("in CompanyGuard.js", !mid);

  if (!mid) {
    console.log("Redirecting...");
    return <Redirect to={config.defaultPath} />;
  }

  return children;
};

CompanyGuard.propTypes = {
  children: PropTypes.node,
};

export default CompanyGuard;
