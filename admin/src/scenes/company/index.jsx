import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCompanies } from "../../services/company.service";

const Company = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCompanies();

        if (!Array.isArray(response?.result?.data)) {
          throw new Error("Dữ liệu trả về không hợp lệ!");
        }
        const formattedCompanies = response.result.data.map(
          (company, index) => ({
            id: company.id || index,
            name: company.name || "Đang cập nhật...",
            address: company.address || "Đang cập nhật...",
            username: company.recruiter?.name || "Đang cập nhật...",
            phone: company.recruiter?.phone || "Đang cập nhật...",
            status: company.status || "Đang cập nhật...",
            position: company.position || "Đang cập nhật...",
          })
        );

        setCompanies(formattedCompanies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (params) => {
    localStorage.setItem("selectedCompany", JSON.stringify(params.row));
    console.log("Thông tin công ty:", params.row);
    navigate("/form");
  };

  const columns = [
    { field: "name", headerName: "Tên cơ sở", flex: 1 },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    { field: "username", headerName: "Đại diện cơ sở", flex: 1 },
    { field: "phone", headerName: "Hotline", flex: 1 },
    { field: "status", headerName: "Trạng thái đăng ký", flex: 1 },
    { field: "position", headerName: "Vị trí tuyển", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="Danh sách cơ sở"
        subtitle="Quản lý danh sách cơ sở tuyển dụng"
      />

      <Box m="40px 0 0 0" height="75vh">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <DataGrid
            rows={companies}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            onRowClick={handleRowClick}
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: colors.blueAccent[700],
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Company;
