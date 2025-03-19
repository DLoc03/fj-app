import { Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/assets/2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    ></Box>
  );
};

export default Dashboard;
