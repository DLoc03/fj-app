import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Header from "../../components/Header";
import {
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { ReceiptAPI } from "../../services"; // Cập nhật API receipt
import { formatDate } from "../../utils/helper";

const Receipt = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReceipt, setSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    ReceiptAPI.getAllReceipt((err, result) => {
      if (err || !result?.data) {
        setReceipts(["Không có dữ liệu"]);
        setLoading(false);
        return;
      }
      setReceipts(result?.data);
      setLoading(false);
    });
  }, []);

  const handleRowClick = (params) => {
    const id = params.row.id;
    navigate(`receipt-form/${id}`);
  };

  const handleOpenDialog = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelected(null);
  };

  const columns = [
    { field: "id", headerName: "ID Hóa Đơn", flex: 1 },
    { field: "userId", headerName: "ID Người Dùng", flex: 1 },
    { field: "packageId", headerName: "ID Gói", flex: 1 },
    { field: "amount", headerName: "Số Tiền", flex: 1 },
    {
      field: "createdAt",
      headerName: "Ngày Tạo",
      flex: 1,
      valueGetter: (params) => formatDate(params.row.createdAt) || "Chưa có",
    },
    {
      field: "view",
      headerName: "Chi Tiết",
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
      <Header
        title="Danh sách hóa đơn"
        subtitle="Danh sách các hóa đơn đã được tạo"
      />

      <Box m="40px 0 0 0" height="75vh">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <DataGrid
            rows={receipts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa hóa đơn này không?
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

export default Receipt;
