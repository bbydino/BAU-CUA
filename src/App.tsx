import { ThemeProvider } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import React from "react";
import Board from "./components/Board";
import PlayerInput from "./components/PlayerInput";
import kiryuCash from "./img/kiryu-cash.jpg";
const App = () => {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#C60000",
      },
      secondary: {
        main: "#D1C500",
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid
          className="bau-cua"
          container
          flexDirection="column"
          justifyContent="flex-start"
          style={{
            background: `url(${kiryuCash})`,
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
            height: "100vh",
            gap: 10,
          }}
        >
          <Grid container item justifyContent="center">
            <Typography
              variant="h3"
              color="primary"
              padding="2%"
              align="center"
              sx={{ textShadow: "3px 3px 1px #000" }}
            >
              <b>BẦU CUA GÀ TÔM CÁ NAI</b>
            </Typography>
          </Grid>
          <Grid container item justifyContent="center">
            <Board />
          </Grid>
          <Grid container item justifyContent="center">
            <PlayerInput />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default App;
