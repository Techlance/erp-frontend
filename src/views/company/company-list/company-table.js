import React from "react";
import { useSelector } from "react-redux";

// material-ui
import {
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

// assets
import Avatar from "../../../ui-component/extended/Avatar";
import { IconArrowRight } from "@tabler/icons";

// project imports
import config from "../../../config";
import { formatDate } from "../../../utils";

//-----------------------|| Company List ||-----------------------//

const CompanyTable = () => {
  const company = useSelector((state) => state.company);
  const { companies } = company;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h4">Company Name</Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Country
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Created On
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              Start Date
            </Typography>
          </TableCell>
          <TableCell>
            <Typography align="center" variant="h4">
              End Date
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
        {companies.map((row, index) => (
          <TableRow hover key={index}>
            <TableCell>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    alt={row.company_name}
                    src={`${config.media_uri}${row.logo}`}
                  />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography align="left" variant="subtitle1" component="div">
                    {row.company_name}
                  </Typography>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>
              <Typography align="center">{row.country}</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">
                {formatDate(row.created_on)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">{row.year_start_date}</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">{row.year_end_date}</Typography>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="text"
                  color="primary"
                  aria-label="more-details"
                  href={`/admin/companies/${row.company_id}`}
                  target="_blank"
                >
                  <Typography align="center">More </Typography>
                  <IconArrowRight sx={{ fontSize: "1.1rem" }} />
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CompanyTable;
