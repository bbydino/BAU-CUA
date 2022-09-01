import {
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
import { CARD_STYLE, formatMoney, Languages, t } from "../../util";

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
      spacing={1}
      sx={CARD_STYLE}
    >
      <Grid item>
        <Typography variant="h6" color="primary">
          Player Summary
        </Typography>
      </Grid>
      <Grid item container flexDirection="row" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="body2" color="secondary">
            {t("LANGUAGE", user.lang) + ":"}
          </Typography>
        </Grid>
        <Grid item>
          <Select
            size="small"
            variant="standard"
            color="secondary"
            value={user.lang}
            onChange={changeLang}
          >
            <MenuItem color="secondary" value={Languages.ENGLISH}>
              <Typography variant="body2" color="secondary">
                {t("ENGLISH", Languages.ENGLISH)}
              </Typography>
            </MenuItem>
            <MenuItem color="secondary" value={Languages.VIETNAMESE}>
              <Typography variant="body2" color="secondary">
                {t("VIETNAMESE", Languages.VIETNAMESE)}
              </Typography>
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          {t("NAME", user.lang) + ": " + user.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          {t("MONEY", user.lang) + ": $" + formatMoney(user.money)}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          WIN STREAK: {user.winStreak}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          LOSING STREAK: {user.loseStreak}
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
