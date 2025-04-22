import React from "react";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { formatCurrency, formatDate } from "../../utils/helper";

function ResultCard({ name, quantity, salary, date, applicant }) {
  return (
    <Paper sx={{ my: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Typography>Vị trí: {name === name || ""}</Typography>
        </Grid>
        <Divider orientation="horizontal" flexItem />
        <Grid item size={{ xs: 12, md: 3 }}>
          Mức lương: {salary === `${formatCurrency(salary)}đ` || ""}
        </Grid>
        <Grid item size={{ xs: 12, md: 3 }}>
          Số lượng tuyển: {quantity === `${quantity} nhân sự` || ""}
        </Grid>
        <Grid item size={{ xs: 12, md: 3 }}>
          Ngày đăng: {date === formatDate(date) || ""}
        </Grid>
        <Grid item size={12}>
          Số lượng hồ sơ: {applicant === `${applicant} ứng viên` || ""}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ResultCard;
