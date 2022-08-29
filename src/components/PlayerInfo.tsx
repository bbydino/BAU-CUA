import { Grid, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../store/hooks";
import { BG_STYLE } from "../util";

const PlayerInfo = () => {
  const user = useAppSelector((state) => state.user);
  console.log(user);
  return (
    <Grid
      container
      item
      flexDirection="column"
      justifyContent="flex-start"
      sx={{ ...BG_STYLE, padding: "10px" }}
    >
      <Grid item>
        <Typography variant="h6" color="secondary">
          Player Summary
        </Typography>
      </Grid>{" "}
      <Grid item>
        <Typography variant="body2" color="secondary">
          NAME: {user.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          MONEY: {user.money}
        </Typography>
        <Typography variant="body2" color="secondary">
          WIN STREAK: {user.winStreak}
        </Typography>
        <Typography variant="body2" color="secondary">
          LOSING STREAK: {user.loseStreak}
        </Typography>
        <Typography variant="body2" color="secondary">
          MOST CHOSEN: {user.mostChosen}
        </Typography>
        <Typography variant="body2" color="secondary">
          LUCKY ANIMAL: {user.mostWon}
        </Typography>
        <Typography variant="body2" color="secondary">
          UNLUCKY ANIMAL: {user.mostLost}
        </Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default PlayerInfo;
