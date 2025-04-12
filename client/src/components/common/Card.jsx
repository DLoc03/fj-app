import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import album from "../../assets/album-1.jpg";
import { Button } from "@mui/material";

import PATHS from "../../routes/path";
import formatMoney from "../../utils/formatMoney";

function CardDetail({ id, jobName, quantity, salary, company }) {
  return (
    <Card
      sx={{
        height: "240px",
        width: "200px",
        zIndex: "9",
        backgroundImage: `url(${album})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.5s ease-in-out",
        span: {
          fontWeight: "bold",
        },
      }}
    >
      {company && (
        <CardContent
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            p: "6px",
            transition:
              "height 0.5s ease-in-out, background-color 0.5s ease-in-out",
            height: "100px",
            "&:hover": {
              height: "200px",
              borderRadius: "20px 20px 0 0",
              backgroundColor: "secondary.main",
              color: "white",
            },
            overflow: "hidden",
            "&:hover .description": {
              opacity: 1,
            },
          }}
        >
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            <span>{company.name}</span>
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            <span>Vị trí tuyển:</span> {jobName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              my: "2px",
            }}
          >
            <span>Lương</span>: {formatMoney(salary)}
          </Typography>
          <Typography
            className="description"
            variant="body2"
            sx={{
              textAlign: "center",
              opacity: 0,
              transition: "opacity 0.5s ease-in-out",
              "&.hover-visible": { opacity: 1 },
            }}
          >
            <span>Số lượng:</span> {quantity}
          </Typography>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              alignSelf: "center",
              "&:hover": { backgroundColor: "white", color: "secondary.main" },
            }}
            color="white"
            onClick={() => {
              window.location.href = PATHS.JOBDETAIL.replace(":id", id);
              sessionStorage.setItem("selectedCompany", company.id);
            }}
          >
            Chi tiết
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

export default CardDetail;
