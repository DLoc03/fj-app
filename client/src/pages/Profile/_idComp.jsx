import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import { AuthAPI } from "../../services";
import Authenticated from "../../components/ui/Authenticated";
import PATHS from "../../routes/path";
import SpinningLoader from "../../components/common/SpinningLoading";

function UserCompany() {
  const [comp, setComp] = useState({
    name: "",
    address: "",
    description: "",
    phone: "",
    user: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthAPI.getCurrentUser((err, result) => {
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
      setLoading(false);
    });
  }, []);

  if (loading) return <SpinningLoader />;

  return (
    <>
      {comp.name ? (
        comp.status !== "Pending" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 4,
              mx: "auto",
              alignItems: "center",
              gap: 4,
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <Grid container spacing={{ xs: 1, md: 4 }}>
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
                size={{ sx: 12, sm: 4, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={{ xs: "12px", md: "16px" }}>
                  Tên cơ sở
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 8, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={{ xs: "12px", md: "16px" }}
                  fontWeight={700}
                >
                  {comp.name}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={{ xs: "12px", md: "16px" }}>
                  Địa chỉ
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 8, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={{ xs: "12px", md: "16px" }}
                  fontWeight={700}
                >
                  {comp.address}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={{ xs: "12px", md: "16px" }}>
                  Số điện thoại
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 8, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={{ xs: "12px", md: "16px" }}
                  fontWeight={700}
                >
                  {comp.phone}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 3 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={{ xs: "12px", md: "16px" }}>
                  Đại diện cơ sở
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 8, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={{ xs: "12px", md: "16px" }}
                  fontWeight={700}
                >
                  {comp.user}
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography fontSize={{ xs: "12px", md: "16px" }}>
                  Slogan
                </Typography>
              </Grid>
              <Grid
                item
                size={{ sx: 12, sm: 4, md: 9 }}
                display={"flex"}
                alignItems={"center"}
              >
                <Typography
                  fontSize={{ xs: "12px", md: "16px" }}
                  fontWeight={700}
                >
                  {comp.description}
                </Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={() => (window.location.href = PATHS.COMPANY_JOBS)}
            >
              Đăng tuyển dụng nhân sự
            </Button>
          </Box>
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
