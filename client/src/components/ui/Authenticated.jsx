import React, { useState, useEffect } from "react";
import authenImg from "../../assets/serving-photo.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import ReuseableModal from "../common/Modal";
import PopupAlert from "../common/PopUp";

import { CompaniesAPI } from "../../services";
import {
  getProvinces,
  getDistricts,
  getWards,
} from "../../services/addressAPI";

function Authenticated({ message, register }) {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Pending",
  });
  const [addressData, setAddressData] = useState({
    street: "",
    provinceCode: "",
    districtCode: "",
    wardCode: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleShowAlert = (message, callback) => {
    setAlertMessage(message);
    setAlertOpen(true);
    if (callback) {
      const timer = setTimeout(() => {
        setAlertOpen(false);
        callback();
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (openModal) {
      getProvinces().then(setProvinces);
    }
  }, [openModal]);

  useEffect(() => {
    const { name, street, provinceCode, districtCode, wardCode } = addressData;
    setIsFormValid(
      name !== "" &&
        street !== "" &&
        provinceCode !== "" &&
        districtCode !== "" &&
        wardCode !== ""
    );
  }, [addressData]);

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setAddressData((prev) => ({
      ...prev,
      provinceCode,
      districtCode: "",
      wardCode: "",
    }));
    getDistricts(provinceCode).then((data) =>
      setDistricts(data.districts || [])
    );
    setWards([]);
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setAddressData((prev) => ({
      ...prev,
      districtCode,
      wardCode: "",
    }));
    getWards(districtCode).then((data) => setWards(data.wards || []));
  };

  const handleWardChange = (e) => {
    const wardCode = e.target.value;
    setAddressData((prev) => ({ ...prev, wardCode }));
  };

  const handleStreetChange = (e) => {
    const { value } = e.target;
    setAddressData((prev) => ({ ...prev, street: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const selectedProvince = provinces.find(
      (p) => p.code === addressData.provinceCode
    );
    const selectedDistrict = districts.find(
      (d) => d.code === addressData.districtCode
    );
    const selectedWard = wards.find((w) => w.code === addressData.wardCode);

    const fullAddress = `${addressData.street}, ${selectedWard?.name || ""}, ${
      selectedDistrict?.name || ""
    }, ${selectedProvince?.name || ""}`;

    CompaniesAPI.postCompany(
      { ...formData, address: fullAddress },
      (err, result) => {
        setAlertStatus("success");
        handleShowAlert("Đăng ký thông tin thành công!", () => {
          window.location.href = "/company";
        });
      }
    );
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={1}
    >
      <PopupAlert
        open={alertOpen}
        message={alertMessage}
        onClose={handleAlertClose}
        severity={alertStatus}
      />
      <img
        src={authenImg}
        alt="authenticated-img"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />
      <Typography
        variant="h5"
        textAlign={"center"}
        color="white"
        fontWeight={700}
      >
        {message}
      </Typography>
      {register && (
        <>
          <Button
            variant="contained"
            sx={{ width: "280px" }}
            onClick={() => setOpenModal(true)}
          >
            Đăng ký thông tin cơ sở ngay
          </Button>

          <ReuseableModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            title="Đăng ký cơ sở kinh doanh"
          >
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Tên cơ sở"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Số nhà, tên đường"
                value={addressData.street}
                onChange={handleStreetChange}
                fullWidth
              />

              <FormControl fullWidth>
                <InputLabel>Tỉnh/Thành phố</InputLabel>
                <Select
                  value={addressData.provinceCode}
                  onChange={handleProvinceChange}
                  label="Tỉnh/Thành phố"
                >
                  {Array.isArray(provinces) &&
                    provinces.map((p) => (
                      <MenuItem key={p.code} value={p.code}>
                        {p.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth disabled={!addressData.provinceCode}>
                <InputLabel>Quận/Huyện</InputLabel>
                <Select
                  value={addressData.districtCode}
                  onChange={handleDistrictChange}
                  label="Quận/Huyện"
                >
                  {Array.isArray(districts) &&
                    districts.map((d) => (
                      <MenuItem key={d.code} value={d.code}>
                        {d.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth disabled={!addressData.districtCode}>
                <InputLabel>Phường/Xã</InputLabel>
                <Select
                  value={addressData.wardCode}
                  onChange={handleWardChange}
                  label="Phường/Xã"
                >
                  {Array.isArray(wards) &&
                    wards.map((w) => (
                      <MenuItem key={w.code} value={w.code}>
                        {w.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <TextField
                label="Mô tả công việc"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!isFormValid}
              >
                Đăng ký thông tin cơ sở
              </Button>
            </Box>
          </ReuseableModal>
        </>
      )}
    </Box>
  );
}

export default Authenticated;
