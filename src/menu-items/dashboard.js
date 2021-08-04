// third-party
import { FormattedMessage } from "react-intl";
import React from "react";
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
      breadcrumbs: true,
    },
    {
      id: "user-management",
      title: <FormattedMessage id="menu.user-management" />,
      type: "collapse",
      // url: "/user-management",
      icon: icons["IconDeviceAnalytics"],
      breadcrumbs: true,
      children: [
        {
          id: "Users",
          title: <FormattedMessage id="menu.users" />,
          type: "item",
          url: "/user-manager/users",
        },
        {
          id: "User Groups ",
          title: <FormattedMessage id="menu.user-groups" />,
          type: "item",
          url: "/user-manager/groups",
        },
        {
          id: "User Rights",
          title: <FormattedMessage id="menu.user-rights" />,
          type: "item",
          url: "/user-manager/rights",
        },
      ],
    },
  ],
};
