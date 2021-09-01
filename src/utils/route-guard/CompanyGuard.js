import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect, useParams } from "react-router-dom";

// project imports
import config from "../../config";
import useCompanyMaster from "../../hooks/useCompanyMaster";
import useRequest from "../../hooks/useRequest";
import Loader from "../../ui-component/Loader";

//-----------------------|| Company Guard ||-----------------------//

/**
 * Authorization `company` guard for routes
 * @param {PropTypes.node} children children element/node
 */

const CompanyGuard = ({ children }) => {
  const { mid } = useParams();
  const { setMasterCompany } = useCompanyMaster();

  const [loading, setLoading] = useState(true);
  const [forward, setForward] = useState(0);

  const [getCompanies, loadingCompanies, , { companies }] = useRequest({
    url: "/company/get-user-company",
    initialState: {
      companies: [],
    },
  });

  useEffect(() => {
    const f = async () => {
      await getCompanies();
      setLoading(false);
    };

    f();

    if (loading || loadingCompanies) {
      setForward(0);
    } else {
      function isPresent({ company_id }) {
        return company_id === parseInt(mid);
      }

      const company = companies.find(isPresent);

      if (company) {
        setMasterCompany(company);

        setForward(1);
      } else {
        setForward(2);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (forward === 1) {
    return children;
  } else if (forward === 2) {
    return <Redirect to={config.defaultPath} />;
  } else {
    return <Loader />;
  }
};

CompanyGuard.propTypes = {
  children: PropTypes.node,
};

export default CompanyGuard;
