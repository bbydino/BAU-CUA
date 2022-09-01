import { ThemeOptions } from "@mui/material";
import React from "react";
import bg from "../img/bg.jpg";
import kiryuCash from "../img/kiryu-cash.jpg";

export const BG_KIRYU_STYLE: React.CSSProperties = {
  height: "100vh",
  background: `url(${kiryuCash})`,
  backgroundSize: "33%",
  backgroundRepeat: "repeat",
  overflow: "auto",
};

export const BG_STYLE: React.CSSProperties = {
  background: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "auto",
  border: "6.9px solid #AF9C1B",
  borderRadius: "6.9px",
  width: "90%",
  maxWidth: "600px",
};

export const CARD_STYLE: React.CSSProperties = { ...BG_STYLE, padding: "1%" };

export const FONT_FAMILY: string = [
  "VPSQUNHH",
  "VPSQUNHT",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Fira Sans",
  "Droid Sans",
  "Helvetica Neue",
  "sans-serif",
].join(",");

export const THEME: ThemeOptions = {
  palette: {
    primary: {
      main: "#C60000",
    },
    secondary: {
      main: "#D1C500",
    },
  },
  typography: {
    fontFamily: FONT_FAMILY,
  },
};
