import React from "react";

// third-party
import { FormattedMessage } from "react-intl";

// assets
import {
  IconDashboard,
  IconDeviceAnalytics,
  IconFiles,
  IconFileReport,
  IconBusinessplan,
  IconTools,
} from "@tabler/icons";

// constant
const icons = {
  IconDashboard,
  IconDeviceAnalytics,
  IconFiles,
  IconFileReport,
  IconBusinessplan,
  IconTools,
};

//-----------------------|| COMPANY MENU ITEMS ||-----------------------//

// const {mid} = useParams();

export const company_menu = {
  id: "company-menu",
  title: <FormattedMessage id="company-menu" />,
  type: "group",
  children: [
    {
      id: "masters",
      title: <FormattedMessage id="menu.masters" />,
      type: "collapse",
      //   url: "/admin/companies",
      icon: icons["IconFiles"],
      admin: false,
      breadcrumbs: true,
      children: [
        {
          id: "ledger-master",
          title: <FormattedMessage id="menu.ledger-master" />,
          type: "collapse",
          //   url: "/admin/companies",
          children: [
            {
              id: "head",
              title: <FormattedMessage id="menu.head" />,
              type: "item",
              url: `/company/:mid/master/ledger-master/head`,
            },
            {
              id: "group",
              title: <FormattedMessage id="menu.group" />,
              type: "item",
              url: "/company/:mid/master/ledger-master/group",
            },
            {
              id: "ledger",
              title: <FormattedMessage id="menu.ledger" />,
              type: "item",
              url: "/company/:mid/master/ledger-master/ledger",
            },
            {
              id: "opening-balance",
              title: <FormattedMessage id="menu.opening-balance" />,
              type: "item",
              url: "/company/:mid/master/op-bal-brs",
            },
          ],
        },
        {
          id: "cost-center",
          title: <FormattedMessage id="menu.cost-center" />,
          type: "collapse",
          //   url: "/admin/companies",
          children: [
            {
              id: "cost-category",
              title: <FormattedMessage id="menu.cost-category" />,
              type: "item",
              url: `/company/:mid/master/cost-center/category`,
            },
            {
              id: "cost-center",
              title: <FormattedMessage id="menu.cost-center" />,
              type: "item",
              url: `/company/:mid/master/cost-center/center`,
            },
          ],
        },
        {
          id: "budget",
          title: <FormattedMessage id="menu.budget" />,
          type: "collapse",
          // url: "/admin/companies",
          children: [
            {
              id: "pl-budget",
              title: <FormattedMessage id="menu.pl-budget" />,
              type: "item",
              url: "/company/:mid/master/budget/pl/:bid",
            },
            {
              id: "cash-flow-budget",
              title: <FormattedMessage id="menu.cash-flow-budget" />,
              type: "item",
              url: "/company/:mid/master/budget/cashflow/:bid",
            },
          ],
        },
        {
          id: "voucher-types",
          title: <FormattedMessage id="menu.voucher-types" />,
          type: "item",
          url: "/company/:mid/master/voucher-type",
        },
        {
          id: "currency",
          title: <FormattedMessage id="menu.currency" />,
          type: "item",
          url: "/company/:mid/master/currency",
          breadcrumbs: true,
        },
        {
          id: "lc",
          title: <FormattedMessage id="menu.lc" />,
          type: "collapse",
          // url: `/company/:mid/master/lc/import`,
          children: [
            {
              id: "import",
              title: <FormattedMessage id="menu.import" />,
              type: "item",
              url: `/company/:mid/master/lc/import`,
            },
            {
              id: "export",
              title: <FormattedMessage id="menu.export" />,
              type: "item",
              url: `/company/:mid/master/lc/export`,
            },
          ],
        },
      ],
    },
    {
      id: "transactions",
      title: <FormattedMessage id="menu.transactions" />,
      type: "collapse",
      icon: icons["IconBusinessplan"],
      admin: false,
      breadcrumbs: true,
      children: [
        {
          id: "receipt ",
          title: <FormattedMessage id="menu.receipt" />,
          type: "collapse",
          //   url: "/admin/user-manager/groups",
          children: [
            {
              id: "cash-receipt ",
              title: <FormattedMessage id="menu.cash-receipt" />,
              type: "item",
              //   url: "/admin/user-manager/groups",
            },
            {
              id: "bank-receipt ",
              title: <FormattedMessage id="menu.bank-receipt" />,
              type: "item",
              //   url: "/admin/user-manager/groups",
            },
            {
              id: "pdc-receipt ",
              title: <FormattedMessage id="menu.pdc-receipt" />,
              type: "item",
              //   url: "/admin/user-manager/groups",
            },
          ],
        },
        {
          id: "payment",
          title: <FormattedMessage id="menu.payment" />,
          type: "collapse",
          //   url: "/admin/user-manager/rights",
          children: [
            {
              id: "cash-payment ",
              title: <FormattedMessage id="menu.cash-payment" />,
              type: "item",
              //   url: "/admin/user-manager/groups",
            },
            {
              id: "bank-payment ",
              title: <FormattedMessage id="menu.bank-payment" />,
              type: "item",
              //   url: "/admin/user-manager/groups",
            },
            {
              id: "pdc-payment ",
              title: <FormattedMessage id="menu.pdc-payment" />,
              type: "item",
              //   url: "/admin/user-manager/groups",
            },
          ],
        },
        {
          id: "purchase",
          title: <FormattedMessage id="menu.purchase" />,
          type: "collapse",
          //   url: "/admin/user-manager/users",
          children: [
            {
              id: "cash-purchase ",
              title: <FormattedMessage id="menu.cash-purchase" />,
              type: "item",
              //   url: "/admin/user-manager/groups",
            },
            {
              id: "credit-purchase ",
              title: <FormattedMessage id="menu.credit-purchase" />,
              type: "item",
              //   url: "/admin/user-manager/groups",
            },
          ],
        },
        {
          id: "sales",
          title: <FormattedMessage id="menu.sales" />,
          type: "collapse",
          //   url: "/admin/user-manager/users",
          children: [
            {
              id: "cash-sales ",
              title: <FormattedMessage id="menu.cash-sales" />,
              type: "item",
              //   url: "/admin/user-manager/groups",
            },
            {
              id: "credit-sales ",
              title: <FormattedMessage id="menu.credit-sales" />,
              type: "item",
              //   url: "/admin/user-manager/groups",
            },
          ],
        },
        {
          id: "debit-note",
          title: <FormattedMessage id="menu.debit-note" />,
          type: "item",
          //   url: "/admin/user-manager/users",
        },
        {
          id: "credit-note",
          title: <FormattedMessage id="menu.credit-note" />,
          type: "item",
          //   url: "/admin/user-manager/users",
        },
        {
          id: "contra",
          title: <FormattedMessage id="menu.contra" />,
          type: "item",
          //   url: "/admin/user-manager/users",
        },
        {
          id: "journal",
          title: <FormattedMessage id="menu.journal" />,
          type: "item",
          //   url: "/admin/user-manager/users",
        },
        {
          id: "memo",
          title: <FormattedMessage id="menu.memo" />,
          type: "item",
          //   url: "/admin/user-manager/users",
        },
        {
          id: "bank-reconcilation",
          title: <FormattedMessage id="menu.bank-reconcilation" />,
          type: "item",
          //   url: "/admin/user-manager/users",
        },
        {
          id: "pdc-check-clearance",
          title: <FormattedMessage id="menu.pdc-check-clearance" />,
          type: "item",
          //   url: "/admin/user-manager/users",
        },
        {
          id: "unadjusted-bill-knockoff",
          title: <FormattedMessage id="menu.unadjusted-bill-knockoff" />,
          type: "item",
          //   url: "/admin/user-manager/users",
        },
        {
          id: "prepayments-lc",
          title: <FormattedMessage id="menu.prepayments-lc" />,
          type: "item",
          //   url: "/admin/user-manager/users",
        },
      ],
    },
    {
      id: "reports",
      title: <FormattedMessage id="menu.reports" />,
      type: "collapse",
      icon: icons["IconFileReport"],
      admin: false,
      breadcrumbs: true,
      children: [
        {
          id: "dashboard",
          title: <FormattedMessage id="menu.dashboard" />,
          type: "item",
          //   url: "/admin/user-manager/groups",
        },
        {
          id: "receivable",
          title: <FormattedMessage id="menu.receivable" />,
          type: "item",
          //   url: "/admin/user-manager/groups",
        },
        {
          id: "payable",
          title: <FormattedMessage id="menu.payable" />,
          type: "item",
          //   url: "/admin/user-manager/groups",
        },
        {
          id: "gl",
          title: <FormattedMessage id="menu.gl" />,
          type: "item",
          //   url: "/admin/user-manager/groups",
        },
        {
          id: "pl",
          title: <FormattedMessage id="menu.pl" />,
          type: "item",
          //   url: "/admin/user-manager/groups",
        },
        {
          id: "cash-flow",
          title: <FormattedMessage id="menu.cash-flow" />,
          type: "item",
          //   url: "/admin/user-manager/groups",
        },
        {
          id: "budget",
          title: <FormattedMessage id="menu.budget" />,
          type: "item",
          //   url: "/admin/user-manager/groups",
        },
      ],
    },
    {
      id: "tools",
      title: <FormattedMessage id="menu.tools" />,
      type: "collapse",
      icon: icons["IconTools"],
      admin: false,
      breadcrumbs: true,
      children: [
        {
          id: "close-ac-year",
          title: <FormattedMessage id="menu.close-ac-year" />,
          type: "item",
          //   url: "/admin/user-manager/groups",
        },
        {
          id: "start-year",
          title: <FormattedMessage id="menu.startyear" />,
          type: "item",
          //   url: "/admin/user-manager/groups",
        },
        {
          id: "activity-log",
          title: <FormattedMessage id="menu.activity-log" />,
          type: "item",
          //   url: "/admin/user-manager/groups",
        },
      ],
    },
  ],
};
