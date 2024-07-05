import React from "react";

function Logout() {
  const deleteSession = async () => {
    /* your delete sessoin here */
  };
  return (
    <div>
      <button
        className="font-primary font-semibold mx-5"
        onClick={() => {
          deleteSession();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
