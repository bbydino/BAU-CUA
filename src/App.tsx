import React from "react";
import Board from "./components/Board";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FA2D2D",
      },
      secondary: {
        main: "#D1C500",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="bau-cua">
        <h1>BẦU CUA GÀ TÔM CÁ NAI</h1>
        <Board />
      </div>
    </ThemeProvider>
  );
};

export default App;
