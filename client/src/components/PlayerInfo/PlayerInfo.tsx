import {
  Chip,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { setLang } from "../../store/slices/userSlice";
import { CARD_STYLE, Languages, t } from "../../util";
import HowToPlay from "./HowToPlay";

const PlayerInfo = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeLang = (event: SelectChangeEvent<Languages>) => {
    const newLang = event.target.value as Languages;
    if (Object.values(Languages).includes(newLang)) {
      dispatch(setLang(newLang));
    }
  };

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
      <Grid
        item
        container
        flexDirection="row"
        alignItems="center"
        columnSpacing={1}
      >
        <Grid item>
          <Typography variant="body2" color="secondary">
            🌐 {t("LANGUAGE", user.lang) + ":"}
          </Typography>
        </Grid>
        <Grid item>
          <Select
            size="small"
            variant="standard"
            color="secondary"
            value={user.lang}
            onChange={changeLang}
            IconComponent={() => <></>}
          >
            {/* TODO: CHANGE MENU BG COLOR TO PRIMARY */}
            <MenuItem color="secondary" value={Languages.ENGLISH}>
              <Typography variant="body2" color="secondary">
                {t("ENGLISH", Languages.ENGLISH)}
              </Typography>
            </MenuItem>
            <MenuItem color="secondary" value={Languages.VIETNAMESE}>
              <Grid container flexDirection="row" columnSpacing={1}>
                <Grid item>
                  <Typography variant="body2" color="secondary">
                    {t("VIETNAMESE", Languages.VIETNAMESE)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Chip label="BETA" color="info" size="small" />
                </Grid>
              </Grid>
            </MenuItem>
          </Select>
        </Grid>
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
      <Grid item>
        <Typography variant="body2" color="secondary">
          MOST CHOSEN: {user.mostChosen}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          LUCKY ANIMAL: {user.mostWon}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          UNLUCKY ANIMAL: {user.mostLost}
        </Typography>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default PlayerInfo;
