import { ThemeProvider } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Board from "./components/Board";
import PlayerInfo from "./components/PlayerInfo";
import { UserState } from "./store/slices/userSlice";
import store from "./store/store";
import { BG_KIRYU_STYLE, Languages, THEME } from "./util";

const App = () => {
  let theme = createTheme(THEME);
  theme = responsiveFontSizes(theme);

  useEffect(() => {
    const user: UserState = {
      userId: "test2",
      name: "test2",
      lang: Languages.ENGLISH,
      money: 1000,
      winStreak: 0,
      losingStreak: 0,
      mostChosen: undefined,
      mostWon: undefined,
      mostLost: undefined,
    };

    // TODO: allow user to input their username to get their data
    // TODO: once they get their data, then allow play
    // getUserById("test1").then((data) => console.log(data));
    // deleteUserById(user.userId).then((data) => console.log(data));
    // createUser(user).then((data) => console.log(data));
    // updateUserById(user.userId, { ...user, money: 2000 }).then((data) => console.log(data))
  }, []);

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
            <Grid item xs={12}>
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
