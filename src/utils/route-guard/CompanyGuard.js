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
  const { mid } = useParams();
  const { setMasterCompany } = useComapanyMaster();

  console.log("in CompanyGuard");

  const [getCompanies, loading, , { companies }] = useRequest({
    url: "/company/get-user-company",
    method: "GET",
    initialState: {
      companies: [],
    },
  });

  useEffect(() => {
    console.log("func call...");

    const f = async () => {
      await getCompanies();
    };

    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(companies, loading);

  if (loading) {
    return <Loader />;
  } else {
    const company = companies.find((company) => company.company_id === mid);

    if (company) {
      setMasterCompany(company);
      return children;
    }

    return children;

    // return <Redirect to={config.defaultPath} />;
  }
};

CompanyGuard.propTypes = {
  children: PropTypes.node,
};

export default CompanyGuard;
