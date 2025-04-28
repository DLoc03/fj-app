import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

import { formatCurrency, formatDate } from "../../utils/helper";
import PATHS from "../../routes/path";

function ResultCard({ name, quantity, salary, date, applicant }) {
  return (
    <Paper sx={{ my: 2 }}>
      <Typography
        fontSize={{ xs: "16px", md: "18px" }}
        fontWeight={500}
        color="white"
        sx={{ backgroundColor: "secondary.main", p: 2 }}
      >
        Vị trí: {name || ""}
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        sx={{ p: 2, boxSizing: "border-box", pt: 0 }}
      >
        <Grid item size={12}></Grid>
        <Grid item size={{ xs: 12, md: 3 }}>
          <Typography fontSize={{ xs: "12px", md: "16px" }}>
            Mức lương: {salary ? `${formatCurrency(salary)} đ` : ""}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item size={{ xs: 12, md: 4 }}>
          <Typography fontSize={{ xs: "12px", md: "16px" }}>
            Số lượng tuyển: {quantity ? `${quantity} nhân sự` : ""}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item size={{ xs: 12, md: 3 }}>
          <Typography fontSize={{ xs: "12px", md: "16px" }}>
            Ngày đăng: {formatDate(date) || ""}
          </Typography>
        </Grid>
        <Grid item size={12}>
          <Typography fontSize={{ xs: "12px", md: "16px" }}>
            Số lượng hồ sơ: {applicant ? `${applicant} ứng viên` : ""}
          </Typography>
          <Link
            component={RouterLink}
            to={PATHS.HOME}
            sx={{
              color: "blue",
              fontSize: { xs: "12px", md: "16px" },
              textDecoration: "none",
              mt: 1,
            }}
          >
            Xem thêm
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ResultCard;
