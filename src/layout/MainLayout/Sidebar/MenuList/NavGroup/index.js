import PropTypes from "prop-types";
import React from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Divider, List, Typography } from "@material-ui/core";

// project imports
import NavItem from "./../NavItem";
import NavCollapse from "./../NavCollapse";
import useAuth from "../../../../../hooks/useAuth";
// import { FormattedMessage } from "react-intl";
// import { IconDashboard } from "@tabler/icons";

// style constant
const useStyles = makeStyles((theme) => ({
  menuCaption: {
    ...theme.typography.menuCaption,
  },
  subMenuCaption: {
    ...theme.typography.subMenuCaption,
  },
  menuDivider: {
    marginTop: "2px",
    marginBottom: "10px",
  },
}));

//-----------------------|| SIDEBAR MENU LIST GROUP ||-----------------------//

const NavGroup = ({ item }) => {
  const classes = useStyles();
  const { user } = useAuth();
  

  const filteredMenuItems = item.children.filter((item) => {
    if (item.admin && user?.is_superuser) {
      return true;
    } else if (!item.admin) {
      return true;
    }
    return false;
  });

  // menu list collapse & items
  const items = filteredMenuItems.map((menu) => {
    switch (menu.type) {
      case "collapse":
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case "item":
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  // items.unshift([
  //   <NavItem key={-1} item={
  //     {
  //       id: "company-management",
  //       title: <FormattedMessage id="company-management" />,
  //       type: "item",
  //       url: "/admin/companies",
  //       icon: IconDashboard,
  //       breadcrumbs: true,
  //     }
  //   } level={0} />
  // ])

  return (
    <React.Fragment>
      <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              className={classes.menuCaption}
              display="block"
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                  className={classes.subMenuCaption}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider className={classes.menuDivider} />
    </React.Fragment>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
