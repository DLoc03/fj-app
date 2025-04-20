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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    UserAPI.getAllUsers((err, result) => {
      if (err || !result.data) {
        setUsers(["Hiện không có người dùng nào!"]);
        return;
      }
      setUsers(result.data);
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
          <Button color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default User;
