import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { CompanyAPI } from "../../services";
import { formatDate } from "../../utils/helper";

const CompForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();

  const [companyData, setCompanyData] = useState({
    name: "",
    address: "",
    username: "",
    date: "",
    status: "Pending",
  });

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  // };

  useEffect(() => {
    CompanyAPI.getCompanyByID(id, (err, result) => {
      if (err || !result.data) {
        setCompanyData({
          name: "Không có dữ liệu",
          address: "Không có dữ liệu",
          username: "Không có dữ liệu",
          date: "Không có dữ liệu",
          status: "Pending",
        });
        return;
      }
      setCompanyData({
        name: result?.data.name,
        address: result?.data.address,
        username: result?.data.recruiter.name,
        status: result?.data?.status,
        date: formatDate(result?.data?.createdAt),
      });
    });
  }, [id]);

  return (
    <Box m="20px">
      <Header title="Thông tin cơ sở" subtitle="Thông tin cơ sở" />
      <Formik
        // onSubmit={handleFormSubmit}
        initialValues={companyData}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên cơ sở"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Địa chỉ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tên người đại diện đăng ký cơ sở"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Trạng thái xác thực"
                onBlur={handleBlur}
                onChange={handleChange}
                value={
                  values.status === "Pending"
                    ? "Đang chờ xác thực"
                    : "Đã xác thực"
                }
                name="status"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ngày đăng ký"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export default CompForm;
