// third-party
import { FormattedMessage } from "react-intl";

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
      title: <FormattedMessage id="user-mangement" />,
      type: "item",
      url: "/user-management",
      icon: icons["IconDeviceAnalytics"],
      breadcrumbs: false,
    },
  ],
};
