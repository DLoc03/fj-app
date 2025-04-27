import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Sidebar as ProSidebar, Menu } from "react-pro-sidebar";
import SearchIcon from "@mui/icons-material/Search";

const Sidebar = ({ posType }) => {
  return (
    <Box
      sx={{
        width: { xs: "100vw", sm: "100vw", md: "260px" },
        height: "100%",
        background: "black",
      }}
    >
      <ProSidebar style={{ width: "100%", height: "100%" }}>
        <Menu iconShape="square">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={3}
          >
            <Typography variant="h4">FJ HUB</Typography>
          </Box>

          <Box mb="40px">
            <Paper
              component="form"
              sx={{
                mx: "auto",
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "90%",
              }}
            >
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Tìm kiếm" />
              <SearchIcon sx={{ p: "10px" }} />
            </Paper>
          </Box>

          <Box paddingLeft="12px">
            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              Vị trí tuyển
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              value={posType}
              label="Phục vụ"
            />
            <FormControlLabel
              control={<Checkbox />}
              value={posType}
              label="Phụ bếp"
            />
            <FormControlLabel
              control={<Checkbox />}
              value={posType}
              label="Pha chế"
            />
            <FormControlLabel
              control={<Checkbox />}
              value={posType}
              label="Tiếp tân"
            />
          </Box>

          <Box paddingLeft="12px">
            <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
              Loại hình cơ sở
            </Typography>
            <FormControlLabel control={<Checkbox />} label="Nhà hàng" />
            <FormControlLabel
              control={<Checkbox />}
              label="Quán nước, coffee"
            />
            <FormControlLabel control={<Checkbox />} label="Khách sạn" />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
