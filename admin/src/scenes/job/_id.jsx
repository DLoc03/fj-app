import { Box, Typography, useTheme, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import { GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";

import { JobAPI } from "../../services";
import { formatDate } from "../../utils/helper";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Jobs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [job, setJob] = useState({
    company: "",
    jobName: "",
    quantity: "",
    jobDescription: "",
    salary: "",
    date: "",
  });
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    JobAPI.getJobByID(id, (err, result) => {
      if (err || !result.data) {
        setJob({
          company: "",
          jobName: "",
          quantity: "",
          jobDescription: "",
          salary: "",
          date: "",
        });
        return;
      }
      setJob({
        company: result?.data?.company,
        jobName: result?.data?.jobName,
        quantity: result?.data?.quantity,
        salary: result?.data?.salary + "đ",
        jobDescription: result?.data?.jobDescription,
        date: formatDate(result?.data?.createdAt),
      });
    });
  }, []);

  const handleRowClick = (params) => {
    const id = params.row.id;
    navigate(`/job/${id}`);
  };

  const handleStatusToggle = (id, newStatus) => {
    setJob((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, status: newStatus } : company
      )
    );
  };

  const columns = [
    {
      field: "compName",
      headerName: "Cơ sở",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "jobName", headerName: "Vị trí tuyển", flex: 1 },
    { field: "quantity", headerName: "Số lượng", flex: 1 },
    { field: "salary", headerName: "Mức lương", flex: 1 },
    { field: "date", headerName: "Ngày đăng", flex: 1 },
    {
      field: "view",
      headerName: "Chi tiết",
      flex: 1,
      renderCell: (params) => (
        <p
          style={{
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: "800",
          }}
          onClick={() => handleRowClick(params)}
        >
          Chi tiết
        </p>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Thông tin cơ sở" subtitle="Thông tin cơ sở" />
      <Formik
        // onSubmit={handleFormSubmit}
        initialValues={job}
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
                value={values.company}
                name="compName"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vị trí tuyển"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobName}
                name="jobName"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Số lượng tuyển"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mức lương"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.salary}
                name="salary"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mô tả công việc"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobDescription}
                name="desc"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ngày đăng"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.status && !!errors.status}
                helperText={touched.status && errors.status}
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

export default Jobs;
