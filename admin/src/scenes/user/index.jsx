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
import { UserAPI } from "../../services/index";

const User = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    UserAPI.getAllUsers((err, result) => {
      if (err) {
        setError("Có lỗi xảy ra khi tải danh sách người dùng.");
        setLoading(false);
        return;
      }
      if (!result.data || result.data.length === 0) {
        setUsers([]);
      } else {
        const filteredUsers = result.data.filter(
          (user) => user.role === "user"
        );
        setUsers(filteredUsers);
      }

      setLoading(false);
    });
  }, []);

  const handleOpenDialog = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
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
      headerName: "Chi tiết",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{ cursor: "pointer", fontWeight: 800 }}
          onClick={() => handleRowClick(params)}
        >
          Chi tiết
        </Typography>
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
        ) : users.length === 0 ? (
          <Typography>Hiện chưa có người dùng nào.</Typography>
        ) : (
          <DataGrid
            rows={users}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row.id}
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
          <Button color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default User;
