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

import { CompanyAPI } from "../../services";
import { formatDate } from "../../utils/helper";

const Company = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    CompanyAPI.getAllCompany((err, result) => {
      if (err || !result?.data) {
        setCompanies(["Không có dữ liệu"]);
        setLoading(false);
        return;
      }
      setCompanies(result?.data);
      setLoading(false);
    });
  }, []);

  console.log(companies);

  const handleRowClick = (params) => {
    const id = params.row.id;
    navigate(`comp-form/${id}`);
  };

  const handleOpenDialog = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelected(null);
  };

  const handleStatusToggle = (id, newStatus) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, status: newStatus } : company
      )
    );
    CompanyAPI.updateCompanyByID(id, { status: newStatus }, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật trạng thái xác thực", err);
        return;
      }
      alert("Cập nhật trạng thái thành công");
    });
  };

  const handleDestroyToggle = (id, newIsDestroy) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, isDestroy: newIsDestroy } : company
      )
    );
    CompanyAPI.updateCompanyByID(
      id,
      { isDestroy: newIsDestroy },
      (err, result) => {
        if (err) {
          console.error("Lỗi khi cập nhật trạng thái isDestroy", err);
          return;
        }
        alert("Cập nhật trạng thái thành công");
      }
    );
  };

  const columns = [
    { field: "name", headerName: "Tên cơ sở", flex: 1 },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    {
      field: "username",
      headerName: "Đại diện cơ sở",
      flex: 1,
      valueGetter: (params) => params.row.recruiter?.name || "Chưa có",
    },
    {
      field: "phone",
      headerName: "Hotline",
      flex: 1,
      valueGetter: (params) => params.row.recruiter?.phone || "Chưa có",
    },
    {
      field: "date",
      headerName: "Ngày đăng ký",
      flex: 1,
      valueGetter: (params) => formatDate(params.row.createdAt) || "Chưa có",
    },
    {
      field: "status",
      headerName: "Trạng thái xác thực",
      flex: 2,
      renderCell: (params) => {
        const isActive = params.row.status === "Authenticated";

        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <Switch
              checked={isActive}
              onChange={(e) =>
                handleStatusToggle(
                  params.row.id,
                  e.target.checked ? "Authenticated" : "Pending"
                )
              }
              inputProps={{ "aria-label": "status toggle" }}
            />
            <Typography variant="body2">
              {isActive ? "Đã xác thực" : "Chờ xác thực"}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "isDestroy",
      headerName: "Gắn cờ",
      flex: 1,
      renderCell: (params) => {
        const isDestroyed = params.row.isDestroy;

        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <Switch
              checked={isDestroyed}
              onChange={(e) =>
                handleDestroyToggle(
                  params.row.id,
                  e.target.checked ? true : false
                )
              }
              inputProps={{ "aria-label": "destroy toggle" }}
            />
            <Typography variant="body2">
              {isDestroyed ? "Đã gắn cờ" : "Chưa gắn cờ"}
            </Typography>
          </Stack>
        );
      },
    },
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
      <Header
        title="Danh sách cơ sở"
        subtitle="Danh sách cơ sở tuyển dụng đã đăng ký"
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

export default Company;
