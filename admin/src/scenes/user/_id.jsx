import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { UserAPI } from "../../services";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!id) return;
    UserAPI.getUserByID(id, (err, result) => {
      if (err || !result.data) {
        setUserData({
          name: "Không có dữ liệu",
          email: "Không có dữ liệu",
          phone: "Không có dữ liệu",
        });
        return;
      }
      setUserData({
        name: result?.data?.name,
        email: result?.data?.email,
        phone: result?.data?.phone,
      });
    });
  }, [id]);

  return (
    <Box m="20px">
      <Header
        title={`Thông tin ${userData.name ? `- ${userData.name}` : ""}`}
        subtitle="Thông tin người dùng"
      />

      <Formik
        // onSubmit={handleFormSubmit}
        enableReinitialize
        initialValues={userData}
        validationSchema={checkoutSchema}
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
                label="Tên người dùng"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name || ""}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email || ""}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Hotline"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone || ""}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
            </Box>

            {/* <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhật
              </Button>
            </Box> */}
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
});

export default Form;
