import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import * as yup from "yup";

import { getCompanyById } from "../../services/company.service";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CompForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();

  const [companyData, setCompanyData] = useState({
    name: "",
    address: "",
    username: "",
  });

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  // };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await getCompanyById(id);
        console.log(response?.result?.data);
        const data = response?.result?.data;
        setCompanyData({
          name: data.name || "",
          address: data.address || "",
          username: data.recruiter.name || "",
        });
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchCompany();
  }, [id]);

  return (
    <Box m="20px">
      {id ? (
        <Header title="Cập nhật cơ sở" subtitle="Cập nhật thông tin cơ sở" />
      ) : (
        <Header title="Thêm mới cơ sở" subtitle="Thêm mới thông tin cơ sở" />
      )}

      <Formik
        // onSubmit={handleFormSubmit}
        initialValues={companyData}
        validationSchema={checkoutSchema}
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
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Tên cơ sở không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  username: yup.string().required("Tên người đại diện không được để trống"),
});

export default CompForm;
