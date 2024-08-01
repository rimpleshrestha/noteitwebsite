import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../tools/authSlice";

function Logout() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <div>
      <button
        className="font-primary font-semibold mx-5"
        onClick={() => {
          localStorage.clear();
          dispatch(logout());
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
