import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PackageAPI } from "../../services";
import { formatDate } from "../../utils/helper";

const PackageForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    price: 0,
    code: "",
  });

  const handleFormSubmit = (values) => {
    if (id) {
      PackageAPI.updatePackage(id, values, (err, result) => {
        if (err) {
          console.error("Lỗi khi cập nhật gói:", err);
          return;
        }
        navigate("/package");
      });
    } else {
      PackageAPI.postPackage(values, (err, result) => {
        if (err) {
          console.error("Lỗi khi tạo gói:", err);
          return;
        }
        navigate("/package");
      });
    }
  };

  useEffect(() => {
    if (id) {
      PackageAPI.getPackageById(id, (err, result) => {
        if (err) {
          console.error("Lỗi khi lấy thông tin gói:", err);
          return;
        }
        setInitialValues({
          name: result.name,
          description: result.description,
          price: result.price,
          code: result.code,
        });
      });
    }
  }, [id]);

  const validationSchema = yup.object({
    name: yup.string().required("Tên gói là bắt buộc"),
    description: yup.string().required("Mô tả là bắt buộc"),
    price: yup
      .number()
      .required("Giá là bắt buộc")
      .min(0, "Giá phải lớn hơn 0"),
    code: yup.string().required("Mã gói là bắt buộc"), // Đảm bảo mã gói không trống
  });

  return (
    <Box m="20px">
      <Header
        title={id ? "Chỉnh Sửa Gói Dịch Vụ" : "Tạo Gói Dịch Vụ"}
        subtitle={
          id ? "Chỉnh sửa thông tin gói dịch vụ" : "Điền thông tin gói dịch vụ"
        }
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
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
                label="Tên gói"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mô tả"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Giá (VNĐ)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mã gói"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.code}
                name="code"
                error={!!touched.code && !!errors.code}
                helperText={touched.code && errors.code}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {id ? "Cập nhật" : "Tạo"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PackageForm;
