import React from "react";
import { useState, useEffect } from "react";

export const TastedCollection = () => {
  const [tastedBeers, setTasted] = useState([]);
  useEffect(() => {
    localStorage.setItem("tastedBeers", JSON.stringify(tastedBeers));
  }, [tastedBeers]);
  return <div></div>;
};
