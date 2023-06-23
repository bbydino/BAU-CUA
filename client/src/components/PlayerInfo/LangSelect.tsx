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
import { Languages, t } from "../../util";

const LangSelect = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeLang = (event: SelectChangeEvent<Languages>) => {
    const newLang = event.target.value as Languages;
    if (Object.values(Languages).includes(newLang)) {
      dispatch(setLang(newLang));
    }
  };

  return (
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
  );
};

export default LangSelect;
