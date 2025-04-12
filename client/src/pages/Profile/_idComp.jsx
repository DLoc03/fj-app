import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import { AuthAPI } from "../../services";
import Authenticated from "../../components/ui/Authenticated";

function UserCompany() {
  const [comp, setComp] = useState({
    name: "",
    address: "",
    description: "",
    phone: "",
    user: "",
    status: "",
  });

  useEffect(() => {
    AuthAPI.getCompany((err, result) => {
      if (!err && result?.data) {
        setComp({
          name: result?.data?.company.name,
          address: result?.data?.company.address,
          description: result?.data?.company.description,
          status: result?.data?.company.status,
          phone: result?.data?.phone,
          user: result?.data?.name,
        });
      }
    });
  }, []);

  return (
    <>
      {comp.name ? (
        comp.status !== "Pending" ? (
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 4,
              mx: "auto",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Grid container spacing={4}>
              <Grid item size={12}>
                <Typography
                  className="profile__title"
                  variant="h5"
                  textAlign={"center"}
                  fontWeight={700}
                >
                  Thông tin cơ sở
                </Typography>
                <Divider sx={{ mt: 2 }} />
              </Grid>
              <Grid
                item
                size={{ sx: 12, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="body1">Tên cơ sở</Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="body1" fontWeight={700}>
                  {comp.name}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="body1">Địa chỉ</Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="body1" fontWeight={700}>
                  {comp.address}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="body1">Số điện thoại</Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="body1" fontWeight={700}>
                  {comp.phone}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="body1">Đại diện cơ sở</Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="body1" fontWeight={700}>
                  {comp.user}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="body1">Slogan</Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography variant="body1" fontWeight={700}>
                  {comp.description}
                </Typography>
              </Grid>
            </Grid>
            <Button variant="contained">Đăng tuyển dụng nhân sự</Button>
          </Paper>
        ) : (
          <Authenticated
            message={"Đang chờ xác thực thông tin cơ sở..."}
            register={false}
          />
        )
      ) : (
        <Authenticated
          message={"Chưa đăng ký thông tin cơ sở?"}
          register={true}
        />
      )}
    </>
  );
}

export default UserCompany;
