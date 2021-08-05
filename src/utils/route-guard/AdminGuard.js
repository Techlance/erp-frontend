import PropTypes from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";

// project imports
import useAuth from "../../hooks/useAuth";
import config from "../../config";

//-----------------------|| Admin Guard ||-----------------------//

/**
 * Authorization `admin` guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AdminGuard = ({ children }) => {
  const { user } = useAuth();

  console.log("in AdminGuard.js");

  if (!user.is_superuser) {
    return <Redirect to={config.defaultPath} />;
  }

  return children;
};

AdminGuard.propTypes = {
  children: PropTypes.node,
};

export default AdminGuard;
