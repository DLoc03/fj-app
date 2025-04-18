import { useEffect, useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { AuthAPI } from "../../services";
import { useAuth } from "../../context/auth";

import LogoFJ from "../../assets/logo.png";

const Item = ({ title, to, icon, selected, setSelected, collapsed }) => {
  const handleClick = () => {
    setSelected(title);
    window.location.href = to;
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <MenuItem active={selected === title} onClick={handleClick} icon={icon}>
      {!collapsed && (
        <Typography variant="body2" sx={{ ml: 1 }}>
          {title}
        </Typography>
      )}
      <Link to={to} />
    </MenuItem>
  );
};

const ProfileBar = () => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState();
  const [selected, setSelected] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isAuthenticated) {
      AuthAPI.getCurrentUser((err, result) => {
        if (!err && result?.data) {
          setUser(result.data);
        }
      });
    }
  }, [isAuthenticated]);

  return (
    <Box height="100vh">
      <ProSidebar
        collapsed={isSmallScreen}
        style={{ width: "100%", height: "100vh" }}
      >
        <Menu iconShape="square">
          {!isSmallScreen && (
            <Box display="flex" justifyContent="center" mt={2}>
              <img
                src={LogoFJ}
                alt="Avatar"
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "#ffff",
                  borderRadius: "50%",
                }}
              />
            </Box>
          )}
          {!isSmallScreen && (
            <MenuItem style={{ margin: "20px 0" }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="body1">Xin chào</Typography>
                <Typography variant="body1" fontWeight={700}>
                  {user?.name}
                </Typography>
              </Box>
            </MenuItem>
          )}

          <Box ml={isSmallScreen ? 0 : 2} mt={2}>
            {!isSmallScreen && (
              <Typography variant="body1" fontWeight={500}>
                Thông tin
              </Typography>
            )}
            <Item
              title="Thông tin cá nhân"
              to="/profile"
              icon={<PersonIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isSmallScreen}
            />
            <Item
              title="Thông tin cơ sở"
              to="/company"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isSmallScreen}
            />
          </Box>

          <Box ml={isSmallScreen ? 0 : 2} mt={2} mb={4}>
            {!isSmallScreen && (
              <Typography variant="body1" fontWeight={500}>
                Tuyển dụng
              </Typography>
            )}
            <Item
              title="Quản lý tuyển dụng"
              to="/company/jobs"
              icon={<ArticleIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isSmallScreen}
            />
            <Item
              title="Danh sách CV"
              to="/company"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
              collapsed={isSmallScreen}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default ProfileBar;
