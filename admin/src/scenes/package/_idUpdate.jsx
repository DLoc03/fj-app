import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { Box, TextField, Button } from "@mui/material";
import Header from "../../components/Header";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { PackageAPI } from "../../services";
import { formatCurrency } from "../../utils/helper";

const PackageUpdate = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { id } = useParams();
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    price: "",
    code: "",
  });

  useEffect(() => {
    if (!id) return;
    PackageAPI.getPackageByID(id, (err, result) => {
      if (err || !result.data) {
        console.error("Không lấy được dữ liệu package");
        return;
      }
      setPackageData({
        name: result.data.name || "",
        description: result.data.description || "",
        price: result.data.price ?? "",
        code: result.data.code || "",
      });
    });
  }, [id]);

  const handleUpdate = async (values) => {
    PackageAPI.updatePackage(id, values, (err, result) => {
      if (err) {
        console.error("Lỗi cập nhật package", err);
        return;
      }
      alert("Cập nhật gói dịch vụ thành công!");
      navigate("/package");
    });
  };

  const packageSchema = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên gói"),
    description: yup.string().required("Vui lòng nhập mô tả"),
    price: yup.number().required("Vui lòng nhập giá"),
    code: yup.string().required("Vui lòng nhập mã gói"),
  });

  return (
    <Box m="20px">
      <Header
        title="Cập nhật gói dịch vụ"
        subtitle="Sửa thông tin gói dịch vụ"
      />
      <Formik
        initialValues={{
          name: packageData.name,
          description: packageData.description,
          price: packageData.price !== "" ? Number(packageData.price) : "",
          code: packageData.code, // Thêm code vào initialValues
        }}
        enableReinitialize
        validationSchema={packageSchema}
        onSubmit={handleUpdate}
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
                label="Tên gói dịch vụ"
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
                label="Mô tả gói dịch vụ"
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
                value={values.price !== undefined ? values.price : ""}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
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
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhật
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default PackageUpdate;
