import React from "react";
import "./Button.css";
import { useCustomNavigate } from "../../utils/utils";

function Button({ btn_title, path_navigate }) {
  const navigate = useCustomNavigate();
  return (
    <div className="button">
      <button
        className="btn-active"
        onClick={() => navigate(`/${path_navigate}`)}
      >
        {btn_title}
      </button>
    </div>
  );
}

export default Button;
