import {
  Box,
  Typography,
  useTheme,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers, UserDelete } from "../../services/user.service";

const User = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetUsers();
        if (Array.isArray(response?.result?.data)) {
          const formattedUsers = response.result.data
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

  const handleOpenDialog = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUserId) return;
    try {
      await UserDelete(selectedUserId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUserId)
      );
      handleCloseDialog();
    } catch (error) {
      console.error("Xóa thất bại:", error);
    }
  };

  const handleRowClick = (params) => {
    const id = params.row.id;
    if (id) navigate(`form/${id}`);
  };

  const columns = [
    { field: "name", headerName: "Tên người dùng", flex: 2 },
    { field: "phone", headerName: "Hotline ban tuyển dụng", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "view",
      headerName: "Xem thông tin",
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
          Xem thông tin
        </p>
      ),
    },
    {
      field: "del",
      headerName: "Xóa",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleOpenDialog(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Typography variant="h4">Danh sách người dùng</Typography>

      <Box m="40px 0 0 0" height="75vh">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <DataGrid
            rows={users}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa người dùng này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default User;
