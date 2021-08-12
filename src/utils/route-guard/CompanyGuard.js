import PropTypes from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";

// project imports
import config from "../../config";
import { useSelector } from "react-redux";

//-----------------------|| Company Guard ||-----------------------//

/**
 * Authorization `company` guard for routes
 * @param {PropTypes.node} children children element/node
 */
const CompanyGuard = ({ children }) => {
  const { master_company } = useSelector((state) => state.company);

  if (!master_company) {
    <Redirect to={config.defaultPath} />;
  }

  return children;
};

CompanyGuard.propTypes = {
  children: PropTypes.node,
};

export default CompanyGuard;
