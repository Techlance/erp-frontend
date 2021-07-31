// third-party
import { FormattedMessage } from "react-intl";
import React from 'react'
// assets
import { IconDashboard, IconDeviceAnalytics } from "@tabler/icons";

// constant
const icons = {
  IconDashboard,
  IconDeviceAnalytics,
};

//-----------------------|| DASHBOARD MENU ITEMS ||-----------------------//

export const dashboard = {
  id: "dashboard",
  title: <FormattedMessage id="dashboard" />,
  type: "group",
  children: [
    {
      id: "company-management",
      title: <FormattedMessage id="company-management" />,
      type: "item",
      url: "/company-details",
      icon: icons["IconDashboard"],
      breadcrumbs: false,
    },
    {
      id: "user-management",
      title: <FormattedMessage id="user-management" />,
      type: "collapse",
      // url: "/user-management",
      icon: icons["IconDeviceAnalytics"],
      breadcrumbs: false,
      children:[
        {
          id: 'Users',
          title: (
              <React.Fragment>
                  {' '}
                  <FormattedMessage id="Users" /> {' '}
              </React.Fragment>
          ),
          type: 'item',
          url: '/user-manager/users'
        },
        {
          id: 'User Groups ',
          title: (
              <React.Fragment>
                  {' '}
                  <FormattedMessage id="User Groups" /> {' '}
              </React.Fragment>
          ),
          type: 'item',
          url: '/user-manager/groups'
        },
        {
          id: 'User Rights',
          title: (
              <React.Fragment>
                  {' '}
                  <FormattedMessage id="User Rights" /> {' '}
              </React.Fragment>
          ),
          type: 'item',
          url: '/user-manager/rights'
        }
      ]
    },
  ],
};
