const BASE_URL = "https://provinces.open-api.vn/api";

export const getProvinces = () => {
  return fetch(`${BASE_URL}/p/`).then((res) => res.json());
};

export const getDistricts = (provinceCode) => {
  return fetch(`${BASE_URL}/p/${provinceCode}?depth=2`).then((res) =>
    res.json()
  );
};

export const getWards = (districtCode) => {
  return fetch(`${BASE_URL}/d/${districtCode}?depth=2`).then((res) =>
    res.json()
  );
};
