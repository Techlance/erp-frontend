import React from "react";

// material-ui
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// project imports
import Avatar from "./../../../../ui-component/extended/Avatar";

// assets
import useCompany from "../../../../hooks/useCompany";
import config from "../../../../config";
import formatDate from "../../../../utils/format-date";

// const avatarImage = require.context('./../../../../assets/images/profile', true);

// style constant
const useStyles = makeStyles((theme) => ({
  successBadge: {
    color: theme.palette.success.dark,
    width: "14px",
    height: "14px",
  },
  active: {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.success.light + 60,
    color: theme.palette.success.dark,
  },
  reject: {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.orange.light + 80,
    color: theme.palette.orange.dark,
  },
  pending: {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.warning.light,
    color: theme.palette.warning.dark,
  },
}));

//-----------------------|| USER LIST 1 ||-----------------------//

const UserList = () => {
  const theme = useTheme();
  const classes = useStyles();

  // const [data, setData] = React.useState([]);

  // const getData = async () => {
  //     const response = await axios.get('/api/user-list/list');
  //     setData(response.data.users);
  // };

  const { companies } = useCompany();

  // React.useEffect(() => {
  //     getData();
  // }, []);

  return (
    <div>
      <pre>{JSON.stringify(companies[0])}</pre>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>#</TableCell>
            <TableCell>Comapny Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              See More
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies &&
            companies.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>{row.company_id}</TableCell>
                <TableCell>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar
                        alt="User 1"
                        src={`${config.media_uri}${row.logo}`}
                      />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography
                        align="left"
                        variant="subtitle1"
                        component="div"
                      >
                        {row.company_name}
                      </Typography>
                      {/* <Typography align="left" variant="subtitle2" noWrap>
                                                {row.country}
                                            </Typography> */}
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{formatDate(row.created_on)}</TableCell>
                <TableCell>{row.year_start_date}</TableCell>
                <TableCell>{row.year_end_date}</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Tooltip placement="top" title="See More">
                      <IconButton
                        variant="outlined"
                        color="primary"
                        aria-label="delete"
                      >
                        <MoreVertIcon sx={{ fontSize: "1.1rem" }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
