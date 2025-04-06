import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PATHS from "../../../routes/path";
import useAuth from "../../../context/auth";
import { Grid } from "@mui/system";

const pages = [
  { name: "Trang chủ", url: `${PATHS.HOME}` },
  { name: "Ứng tuyển", url: `${PATHS.JOB}` },
  { name: "Về chúng tôi", url: `${PATHS.ABOUT}` },
];

function ResponsiveAppBar() {
  const { isAuthenticated, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: isScrolled ? "primary.main" : "transparent",
        boxShadow: isScrolled ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
        transition: "background-color 0.3s ease-in-out",
        zIndex: "9999",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "center" }}>
          <Avatar
            alt="Logo FJ"
            src="./logo.png"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
            onClick={() => {
              window.location.href = PATHS.HOME;
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              sx={{ color: "white" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page, pageIndex) => (
                <MenuItem
                  key={pageIndex}
                  onClick={() => {
                    handleCloseNavMenu();
                    window.location.href = page.url;
                  }}
                >
                  <Typography sx={{ fontWeight: "700" }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: { xs: "flex", md: "none" },
            }}
          >
            <Avatar alt="Logo FJ" src="./logo.png" />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page, pageIndex) => (
              <Button
                key={pageIndex}
                onClick={() => {
                  handleCloseNavMenu();
                  window.location.href = page.url;
                }}
                sx={{
                  my: 2,
                  mx: 2,
                  fontWeight: 700,
                  color: "white",
                  fontSize: "18px",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Hồ sơ cá nhân">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Avatar"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  sx={{ zIndex: "999999", mt: 1 }}
                >
                  <MenuItem onClick={() => (window.location.href = "/profile")}>
                    <Typography>Hồ sơ cá nhân</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      window.location.href = "/";
                    }}
                  >
                    <Typography>Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Grid container spacing={1} justifyContent="flex-end">
                  <Grid item xs={6} md={3}>
                    <Button
                      onClick={() => (window.location.href = "/login")}
                      sx={{ color: "white", fontWeight: 700, width: "100%" }}
                    >
                      Đăng nhập
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
