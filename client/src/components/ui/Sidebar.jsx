import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Box, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import QuizIcon from "@mui/icons-material/Quiz";
import StoreIcon from "@mui/icons-material/Store";
import SearchIcon from "@mui/icons-material/Search";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const handleClick = () => {
    setSelected(title);
    window.location.href = to;
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <MenuItem
      active={selected === title}
      onClick={() => handleClick()}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ posType }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const width = isMobile ? "100vw" : "260px";

  return (
    <Box>
      <ProSidebar collapsed={isCollapsed} width={width}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4">FJ HUB</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
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
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Tìm kiếm"
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Box>
          )}

          <Box
            paddingLeft={isCollapsed ? undefined : "12px"}
            sx={{ display: isCollapsed ? "none" : "block" }}
          >
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
          <Box
            paddingLeft={isCollapsed ? undefined : "12px"}
            sx={{ display: isCollapsed ? "none" : "block" }}
          >
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
