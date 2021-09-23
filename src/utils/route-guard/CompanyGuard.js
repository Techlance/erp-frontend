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
  const { mid, year_id } = useParams();
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
      function isPresent({ company_id, years }) {
        return (company_id === parseInt(mid)) && ( years.find((year)=>{ return parseInt(year.year_id) === parseInt(year_id) }));
      }

      const company = companies.find(isPresent);

      if (company) {
        let year = company.years.find((year)=>{ return parseInt(year.year_id) === parseInt(year_id) })
        setMasterCompany({
          ...company,
          current_year:year
        });

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
