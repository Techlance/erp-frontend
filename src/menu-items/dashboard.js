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
      url: "/admin/companies",
      icon: icons["IconDashboard"],
      admin: true,
      breadcrumbs: true,
    },
    {
      id: "user-management",
      title: <FormattedMessage id="menu.user-management" />,
      type: "collapse",
      icon: icons["IconDeviceAnalytics"],
      admin: true,
      breadcrumbs: true,
      children: [
        {
          id: "User Groups ",
          title: <FormattedMessage id="menu.user-groups" />,
          type: "item",
          url: "/admin/user-manager/groups",
        },
        {
          id: "User Rights",
          title: <FormattedMessage id="menu.user-rights" />,
          type: "item",
          url: "/admin/user-manager/rights",
        },
        {
          id: "Users",
          title: <FormattedMessage id="menu.users" />,
          type: "item",
          url: "/admin/user-manager/users",
        },
      ],
    },
  ],
};
