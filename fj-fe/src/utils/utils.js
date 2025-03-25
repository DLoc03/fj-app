import { useNavigate } from "react-router-dom";

export function useCustomNavigate() {
  const navigate = useNavigate();

  return (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
}

export function formatSalary(salary) {
  if (!salary) return "";
  return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
}
