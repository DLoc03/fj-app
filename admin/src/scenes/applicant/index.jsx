import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import { GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";

import { ApplicantAPI } from "../../services";
import { formatDate } from "../../utils/helper";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Applicant = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    ApplicantAPI.getApplicantList((err, result) => {
      if (err || !result.data) {
        return;
      }
      setApplicants(result?.data);
    });
  }, []);

  const handleRowClick = (params) => {
    const id = params.row.id;
    navigate(`/applicant/${id}`);
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

  const rows = applicants.map((job) => ({
    id: job.id,
    compName: job.company.name,
    jobName: job.jobName,
    quantity: job.quantity,
    salary: job.salary + "đ",
    date: formatDate(job.createdAt),
  }));

  return (
    <Box m="20px">
      <Header
        title="Danh sách hồ sơ"
        subtitle="Danh sách hồ sơ các ứng viên ứng tuyển"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Applicant;
