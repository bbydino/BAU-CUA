import { ThemeProvider } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import Board from "./components/Board";
import PlayerInfo from "./components/PlayerInfo";
import store from "./store/store";
import { BG_KIRYU_STYLE, THEME } from "./util";

const App = () => {
  let theme = createTheme(THEME);
  theme = responsiveFontSizes(theme);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="bau-cua" style={BG_KIRYU_STYLE}>
          <Grid
            container
            flexDirection="row"
            justifyContent="center"
            rowSpacing={2}
          >
            <Grid item>
              <Typography
                variant="h3"
                color="primary"
                padding="5%"
                align="center"
                sx={{ textShadow: "3px 3px 1px #000" }}
              >
                <b>BÀU CUA Gà TÔM CÁ NAI</b>
              </Typography>
            </Grid>
            <Grid container item justifyContent="center" alignItems="stretch">
              <Board />
              <PlayerInfo />
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
