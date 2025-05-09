import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { PackageAPI } from "../../services/packageAPI";
import SpinningLoader from "../../components/common/SpinningLoading";
import PackageCard from "../../components/ui/PackageCard";
import Authenticated from "../../components/ui/Authenticated";

function PackageList() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const colors = [
    "#FF6347", // Tomato
    "#8A2BE2", // Blue Violet
    "#FFD700", // Gold
    "#FF4500", // Orange Red
    "#DC143C", // Crimson
    "#00008B", // Dark Blue
    "#228B22", // Forest Green
    "#FF1493", // Deep Pink
    "#32CD32", // Lime Green
    "#FF8C00", // Dark Orange
    "#A52A2A", // Brown
    "#FF0000", // Red
    "#8B0000", // Dark Red
    "#800080", // Purple
    "#C71585", // Medium Violet Red
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    PackageAPI.getAllPackage((err, result) => {
      if (!err && result?.data) {
        setPackages(result.data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <SpinningLoader />;

  return (
    <Box
      sx={{ background: "white", height: "100%", p: { xs: 2, sm: 2, md: 8 } }}
    >
      <Grid container spacing={2}>
        <Grid item size={12}>
          <Typography
            fontSize={{ xs: "20px", md: "28px" }}
            textAlign={"center"}
          >
            Lựa chọn gói dịch vụ
          </Typography>
        </Grid>
        <Grid item size={12}>
          <Divider orientation="horizontal" flexItem />
        </Grid>

        {packages && packages.length > 0 ? (
          packages.map((item) => (
            <Grid item size={6} key={item.id}>
              <PackageCard
                id={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                color={getRandomColor()}
              />
            </Grid>
          ))
        ) : (
          <Authenticated message={"Hiện chưa có gói dịch vụ nào!"} />
        )}
      </Grid>
    </Box>
  );
}

export default PackageList;
