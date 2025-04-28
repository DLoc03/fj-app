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
import { PackageAPI } from "../../services/index";

const Package = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    PackageAPI.getAllPackage((err, result) => {
      if (!err && result?.data) {
        setPackages(result.data);
      } else {
        setError("Lỗi tải gói dịch vụ");
      }
      setLoading(false);
    });
  }, []);

  const handleOpenDialog = (id) => {
    const packageToDelete = packages.find((pkg) => pkg.id === id);
    setSelected(id);
    setSelectedPackage(packageToDelete);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelected(null);
    setSelectedPackage(null);
  };

  const handleRowClick = (params) => {
    const id = params.row.id;
    if (id) navigate(`package-form/${id}`);
  };

  const columns = [
    { field: "name", headerName: "Tên gói", flex: 2 },
    { field: "price", headerName: "Đơn giá", flex: 2 },
    { field: "description", headerName: "Mô tả", flex: 2 },
    { field: "code", headerName: "Mã gói", flex: 2 },
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
      <Typography variant="h4">Danh sách gói dịch vụ</Typography>

      <Box m="40px 0 0 0" height="75vh">
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : packages.length === 0 ? (
          <Typography>Hiện chưa có gói dịch vụ nào.</Typography>
        ) : (
          <DataGrid
            rows={packages}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row.id}
          />
        )}
      </Box>
    </Box>
  );
};

export default Package;
