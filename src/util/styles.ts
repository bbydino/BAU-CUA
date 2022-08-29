import bg from "../img/bg.jpg";

export const BG_STYLE = {
  background: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "auto",
  border: "6.9px solid #AF9C1B",
  borderRadius: "6.9px",
  width: "90%",
  maxWidth: "600px",
};

export const FONT_FAMILY = `"VPSQUNHH", "VPSQUNHT", "Roboto", sans-serif`;

export const THEME = {
  palette: {
    primary: {
      main: "#C60000",
    },
    secondary: {
      main: "#D1C500",
    },
  },
  typography: {
    fontFamily: [
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
    ].join(","),
  },
};
