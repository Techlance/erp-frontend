import React from "react";
import { useSelector } from "react-redux";

// material-ui
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

// assets
import { IconArrowRight } from "@tabler/icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

//-----------------------|| Company List ||-----------------------//

const UserTable = () => {
  const { user_accounts } = useSelector((state) => state.userPermissions);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h4">User Name</Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              E-mail
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Superuser
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              More Details
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {user_accounts?.map((row, index) => (
          <TableRow hover key={index}>
            <TableCell>
              <Typography align="left" variant="subtitle1" component="div">
                {row.name}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">{row.email}</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">
                {row.is_superuser ? (
                  <CheckCircleIcon sx={{ color: "success.dark" }} />
                ) : (
                  <CancelIcon color="error" />
                )}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                color="primary"
                aria-label="more-details"
                href={`/admin/user-manager/users/${row.id}`}
                target="_blank"
                endIcon={<IconArrowRight sx={{ fontSize: "1.1rem" }} />}
              >
                <Typography>More</Typography>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
