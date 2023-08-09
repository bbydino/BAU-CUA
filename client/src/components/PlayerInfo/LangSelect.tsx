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
import { updateUserById } from "../../api";
import { useAppSelector } from "../../store/hooks";
import { isGuestUserId, setLang } from "../../store/slices/userSlice";
import { BG, Languages, t } from "../../util";

interface LangSelectProps {
  justifyContent?: string;
}
const LangSelect: React.FC<LangSelectProps> = ({
  justifyContent = "center",
}) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeLang = (event: SelectChangeEvent<Languages>) => {
    const newLang = event.target.value as Languages;
    if (Object.values(Languages).includes(newLang)) {
      dispatch(setLang(newLang));
      if (!isGuestUserId(user.userId)) {
        updateUserById(user.userId, { ...user, lang: newLang });
      }
    }
  };

  return (
    <Grid
      item
      container
      flexDirection="row"
      justifyContent={justifyContent}
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
          inputProps={{
            MenuProps: {
              MenuListProps: {
                sx: {
                  ...BG,
                },
              },
            },
          }}
        >
          <MenuItem color="secondary" value={Languages.ENGLISH}>
            <Typography component="span" variant="body2" color="secondary">
              {t("ENGLISH", Languages.ENGLISH)}
            </Typography>
          </MenuItem>
          <MenuItem color="secondary" value={Languages.VIETNAMESE}>
            <Grid container flexDirection="row" columnSpacing={1}>
              <Grid item>
                <Typography component="span" variant="body2" color="secondary">
                  {t("VIETNAMESE", Languages.VIETNAMESE)}
                  <Chip label="BETA" color="info" size="small" />
                </Typography>
              </Grid>
            </Grid>
          </MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default LangSelect;
