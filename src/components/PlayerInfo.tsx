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
        <Typography variant="body2" color="secondary">
          <span>NAME: {user.name}</span>
        </Typography>
        <Typography variant="body2" color="secondary">
          <span>MONEY: {user.money}</span>
        </Typography>
        <Typography variant="body2" color="secondary">
          <span>WIN STREAK: {user.winStreak}</span>
        </Typography>
        <Typography variant="body2" color="secondary">
          <span>LOSING STREAK: {user.loseStreak}</span>
        </Typography>
        <Typography variant="body2" color="secondary">
          <span>MOST CHOSEN: {user.mostChosen}</span>
        </Typography>
        <Typography variant="body2" color="secondary">
          <span>LUCKY ANIMAL: {user.mostWon}</span>
        </Typography>
        <Typography variant="body2" color="secondary">
          <span>UNLUCKY ANIMAL: {user.mostLost}</span>
        </Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default PlayerInfo;
