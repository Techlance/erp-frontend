import React, { useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

// assets
import EditIcon from "@material-ui/icons/EditTwoTone";
import DeleteIcon from "@material-ui/icons/DeleteForeverTwoTone";
import EditUserGroup from "../../../components/user-management/EditUserGroup";
import useUserPermissions from "../../../hooks/useUserPermissions";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import AnimateButton from "../../../ui-component/extended/AnimateButton";

const UserGroupTable = () => {
  const { user_groups } = useSelector((state) => state.userPermissions);

  const { deleteUserGroup } = useUserPermissions();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [data, setData] = useState({
    id: 0,
    user_group_name: "",
    backdated_days: "",
  });

  const handleAgree = async () => {
    await deleteUserGroup(data.id);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableCell variant="h4">
            <Typography variant="h4">Group Name</Typography>
          </TableCell>
          <TableCell variant="h4">
            <Typography align="center" variant="h4">
              Backdated Days
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Edit
            </Typography>
          </TableCell>
        </TableHead>

        <TableBody>
          {user_groups?.map((row, index) => (
            <TableRow hover key={index}>
              <TableCell>
                <Typography align="left" variant="subtitle1" component="div">
                  {row.user_group_name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography align="center">{row.backdated_days}</Typography>
              </TableCell>
              <TableCell align="center">
                <Stack flex direction="row" justifyContent="space-around">
                  <AnimateButton>
                    <Button
                      variant="outlined"
                      color="primary"
                      aria-label="more-details"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setData(row);
                        setShowEditModal(true);
                      }}
                    >
                      <Typography>Edit</Typography>
                    </Button>
                  </AnimateButton>

                  <AnimateButton>
                    <Button
                      variant="outlined"
                      color="error"
                      aria-label="delete-details"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setData(row);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </AnimateButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditUserGroup
        open={showEditModal}
        handleClose={() => setShowEditModal(false)}
        data={data}
      />
      <ConfirmDeleteDialog
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleAgree={handleAgree}
        title="Delete User Group"
        body="Are you sure you want to delete this User Group? This can not be undone!"
      />
    </>
  );
};

export default UserGroupTable;
