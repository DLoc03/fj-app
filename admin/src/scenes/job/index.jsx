import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import { GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";

import { JobAPI } from "../../services";
import { formatDate } from "../../utils/helper";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    JobAPI.getAllJob((err, result) => {
      if (err || !result.data) {
        setJobs([]);
        return;
      }
      setJobs(result?.data);
    });
  }, []);

  const handleRowClick = (params) => {
    const id = params.row.id;
    navigate(`/job/${id}`);
  };

  const handleStatusToggle = (id, newStatus) => {
    setJobs((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, status: newStatus } : company
      )
    );
    //Call API Here
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

  const rows = jobs.map((job) => ({
    id: job._id,
    compName: job.company.name,
    jobName: job.jobName,
    quantity: job.quantity,
    salary: job.salary + "đ",
    date: formatDate(job.createdAt),
  }));

  return (
    <Box m="20px">
      <Header
        title="Danh sách công việc đăng tuyển"
        subtitle="Các công việc đang tuyển ở các cơ sở"
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

export default Jobs;
