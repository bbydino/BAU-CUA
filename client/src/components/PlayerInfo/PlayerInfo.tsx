import { Grid, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { CARD_STYLE, t } from "../../util";
import HowToPlay from "./HowToPlay";
import LangSelect from "./LangSelect";

const PlayerInfo = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <Grid
      container
      item
      flexDirection="column"
      justifyContent="flex-start"
      rowSpacing={1}
      xl={3}
      sm={3}
      sx={CARD_STYLE}
    >
      <Grid item>
        <HowToPlay />
      </Grid>
      <Grid item>
        <Typography variant="h6" color="primary">
          Player Summary
        </Typography>
      </Grid>
      <Grid item>
        <LangSelect justifyContent="start" />
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          📛 {t("NAME", user.lang) + ": " + user.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          💸 {t("MONEY", user.lang) + ": $" + user.money}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          🔥 {t("WIN STREAK", user.lang) + ": " + user.winStreak}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          😔 {t("LOSING STREAK", user.lang) + ": " + user.losingStreak}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PlayerInfo;
