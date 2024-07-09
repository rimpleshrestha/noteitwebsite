import React, { useState } from "react";
import MOCK_JSON from "../../MOCK_DATA.json";
import { nanoid } from "@reduxjs/toolkit";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
function Favorates() {
  const [favorate, setFavorate] = useState(false);
  return (
    <div className="w-full h-screen">
      <h1 className="text-4xl max-sm:text-2xl font-primary font-medium text-center mt-20">
        Your Favorite Notes 📒
      </h1>
      <div className="grid gap-9 py-20 px-40 grid-cols-4  max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 max-sm:px-6  max-xl:p-10  "></div>
    </div>
  );
}

export default Favorates;
