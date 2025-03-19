import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { GetUsers } from "../../services/user.service";

const User = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetUsers();
        console.log("List users: ", response?.list?.result?.list);
        if (Array.isArray(response?.list?.result?.list)) {
          const formattedUsers = response.list.result.list
            .filter((user) => user.role === "user")
            .map((user, index) => ({
              id: user.id || index,
              name: user.name,
              phone: user.phone || "Chưa có số",
              email: user.email,
            }));

          setUsers(formattedUsers);
        } else {
          throw new Error("Dữ liệu trả về không hợp lệ!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: "name", headerName: "Tên người dùng", flex: 1 },
    { field: "phone", headerName: "Hotline ban tuyển dụng", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="Danh sách người dùng"
        subtitle="Quản lý danh sách người dùng"
      />

      <Box m="40px 0 0 0" height="75vh">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <DataGrid
            checkboxSelection
            rows={users}
            columns={columns}
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .name-column--cell": { color: colors.greenAccent[300] },
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
          />
        )}
      </Box>
    </Box>
  );
};

export default User;
