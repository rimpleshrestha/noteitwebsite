import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const deleteSession = async () => {
    /* your delete sessoin here */
  };
  return (
    <div>
      <button
        className="font-primary font-semibold mx-5"
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
