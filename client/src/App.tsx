import { ThemeProvider } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Board } from "./components/Board";
import { JoinModal, LoginModal, PlayerInfo } from "./components/PlayerInfo";
import store from "./store/store";
import { BG_KIRYU_STYLE, THEME, socket } from "./util";

const App = () => {
  let theme = createTheme(THEME);
  theme = responsiveFontSizes(theme);

  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [joinSuccess, setJoinSuccess] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onJoin() {
      setJoinSuccess(true);
    }

    socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // TODO: list active players in room (create new component in playerInfo)
    socket.on("join", onJoin);

    // TODO: display active status
    console.log(isConnected);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("join", onJoin);
      socket.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="bau-cua" style={BG_KIRYU_STYLE}>
          <LoginModal
            isOpen={false}
            handleLoginSuccess={() => setLoginSuccess(true)}
          />
          <JoinModal
            isOpen={!joinSuccess}
            handleJoinSuccess={() => setJoinSuccess(true)}
          />
          <Grid
            container
            flexDirection="row"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <Grid item xs={12} sx={{ height: "10%" }}>
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
            <Grid container item justifyContent="center" sx={{ height: "80%" }}>
              <Grid item container xs={7} sm={7}>
                <Board />
              </Grid>
              <Grid item container flexDirection="column" xs={5} sm={4}>
                <Grid item container sx={{ height: "50%" }}>
                  <PlayerInfo />
                </Grid>
                <Grid item container sx={{ height: "50%" }}>
                  {/* TODO: ADD ROOM INFO */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
