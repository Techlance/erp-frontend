import React, { useEffect, useState } from "react";
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

  const [loading, setLoading] = useState(true);

  console.log("in CompanyGuard");

  const [getCompanies, loadingCompanies, , { companies }] = useRequest({
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
      setLoading(false);
    };

    f();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(loading || loadingCompanies);

  if (loading || loadingCompanies) {
    return <Loader />;
  } else {
    function isPresent({ company_id }) {
      // eslint-disable-next-line eqeqeq
      return company_id == mid;
    }

    const company = companies.find(isPresent);

    if (company) {
      console.log("yay");
      // setMasterCompany(company);
      return children;
    }

    // return children;

    return <Redirect to={config.defaultPath} />;
  }
};

CompanyGuard.propTypes = {
  children: PropTypes.node,
};

export default CompanyGuard;
