import { ThemeProvider } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import Board from "./components/Board";
import PlayerInfo from "./components/PlayerInfo";
import PlayerInput from "./components/PlayerInput";
import kiryuCash from "./img/kiryu-cash.jpg";
import store from "./store/store";
import { THEME } from "./util";

const App = () => {
  let theme = createTheme(THEME);
  theme = responsiveFontSizes(theme);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Grid
          className="bau-cua"
          container
          flexDirection="column"
          justifyContent="flex-start"
          style={{
            background: `url(${kiryuCash})`,
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
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
              <b>BÀU CUA Gà TÔM CÁ NAI</b>
            </Typography>
          </Grid>
          <Grid container item justifyContent="center">
            <Board />
          </Grid>
          <Grid container item justifyContent="center">
            <PlayerInfo />
          </Grid>
          <Grid container item justifyContent="center">
            <PlayerInput />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
