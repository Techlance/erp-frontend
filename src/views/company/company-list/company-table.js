import React from "react";

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
import Avatar from "../../../../ui-component/extended/Avatar";
import { IconArrowRight } from "@tabler/icons";

// project imports
import useCompany from "../../../../hooks/useCompany";
import config from "../../../../config";
import formatDate from "../../../../utils/format-date";

//-----------------------|| Company List ||-----------------------//

const CompanyTable = () => {
  const { companies } = useCompany();

  return (
    <div>
      <pre>{JSON.stringify(companies, null, 2)}</pre>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography align="center">Company Name</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">Country</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">Created On</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">Start Date</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">End Date</Typography>
            </TableCell>
            <TableCell>
              <Typography align="center">More Details</Typography>
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
                    <Typography
                      align="left"
                      variant="subtitle1"
                      component="div"
                    >
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
                    // onClick={(row) => handleCompanyClick(row.company_id)}
                    href={`/companies/${row.company_id}`}
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
    </div>
  );
};

export default CompanyTable;
