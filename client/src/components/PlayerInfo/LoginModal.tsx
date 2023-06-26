import {
  Alert,
  Button,
  Grid,
  Modal,
  SimplePaletteColorOptions,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, getUserById } from "../../api";
import { useAppSelector } from "../../store/hooks";
import {
  UserState,
  isGuestUserId,
  setUser,
} from "../../store/slices/userSlice";
import { BG_STYLE, THEME, t } from "../../util";
import HowToPlay from "./HowToPlay";
import LangSelect from "./LangSelect";

enum AccountTypes {
  EXISTING = "existing",
  NEW = "new",
}

interface LoginModalProps {
  isOpen: boolean;
  handleLoginSuccess: () => void;
}
const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  handleLoginSuccess,
}) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [accountType, setAccountType] = useState<AccountTypes>(
    AccountTypes.EXISTING
  );
  const [error, setError] = useState<string>("");

  const handleUsernameInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsername(event.target.value);
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const handleAccountTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAccountType: AccountTypes
  ) => {
    if (newAccountType !== null) {
      setAccountType(newAccountType);
    }
  };

  const handleLoginSubmit = async () => {
    if (username === "" || password === "" || isGuestUserId(username)) {
      setError("INVALID USERNAME OR PASSWORD");
      return;
    }
    if (accountType === AccountTypes.NEW && password !== passwordConfirm) {
      setError("PASSWORD MUST MATCH CONFIRMATION PASSWORD");
      return;
    }

    try {
      if (accountType === AccountTypes.NEW) {
        const newUser: UserState = {
          userId: username,
          name: username,
          lang: user.lang,
          money: 10000,
          winStreak: 0,
          losingStreak: 0,
          mostChosen: undefined,
          mostWon: undefined,
          mostLost: undefined,
        };
        // TODO: ADD HASHED PASSWORD TO API CALL
        await createUser(newUser);
        dispatch(setUser(newUser));
        setError("");
        handleLoginSuccess();
      } else if (accountType === AccountTypes.EXISTING) {
        // TODO: ADD HASHED PASSWORD TO API CALL
        const res = await getUserById(username);
        const user: UserState = {
          userId: res.data.userId,
          name: res.data.name,
          lang: res.data.lang,
          money: res.data.money,
          winStreak: res.data.winStreak,
          losingStreak: res.data.losingStreak,
          mostChosen: res.data.mostChosen,
          mostWon: res.data.mostWon,
          mostLost: res.data.mostLost,
        };
        dispatch(setUser(user));
        setError("");
        handleLoginSuccess();
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("ERROR FINDING USER");
      } else if (err.response?.status === 409) {
        setError("ERROR CREATING USER");
      } else {
        setError("UNKNOWN ERROR OCCURRED");
      }
    }
  };

  return (
    <Modal open={isOpen}>
      <Box
        sx={{
          ...BG_STYLE,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "69%",
          maxHeight: "69%",
          padding: "2%",
        }}
      >
        <Grid
          container
          flexDirection="column"
          rowSpacing={2}
          alignItems="center"
        >
          <Grid item>
            <Typography align="center" variant="h4" color="primary">
              <b>{t("BÀU CUA Gà TÔM CÁ NAI", user.lang)}</b>
            </Typography>
          </Grid>
          <Grid item>
            <HowToPlay />
          </Grid>
          <Grid
            item
            container
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            columnSpacing={1}
          >
            <Grid item>
              <Typography variant="body2" color="secondary">
                🌐 {t("LANGUAGE", user.lang) + ":"}
              </Typography>
            </Grid>
            <Grid item>
              <LangSelect />
            </Grid>
          </Grid>
          <Grid item container flexDirection="row" justifyContent="center">
            <ToggleButtonGroup
              exclusive
              color="primary"
              value={accountType}
              onChange={handleAccountTypeChange}
              fullWidth
            >
              <ToggleButton value={AccountTypes.EXISTING}>
                <Typography
                  align="center"
                  variant="body2"
                  color={
                    accountType === AccountTypes.EXISTING
                      ? "secondary"
                      : "primary"
                  }
                >
                  <b>{t("RETURNING PLAYER", user.lang)}</b>
                </Typography>
              </ToggleButton>
              <ToggleButton value={AccountTypes.NEW}>
                <Typography
                  align="center"
                  variant="body2"
                  color={
                    accountType === AccountTypes.NEW ? "secondary" : "primary"
                  }
                >
                  <b>{t("NEW PLAYER", user.lang)}</b>
                </Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {error !== "" && (
            <Grid item>
              <Alert severity="error">{t(error, user.lang)}</Alert>
            </Grid>
          )}
          <Grid item>
            <TextField
              focused
              type="text"
              label={t("USERNAME", user.lang)}
              id="username"
              variant="outlined"
              value={username.toString()}
              size="small"
              onChange={(event) => handleUsernameInputChange(event)}
              color="secondary"
              inputProps={{
                style: {
                  textAlign: "center",
                  color: (THEME.palette!.secondary as SimplePaletteColorOptions)
                    .main,
                },
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              focused
              type="password"
              id="password"
              label={t("PASSWORD", user.lang)}
              variant="outlined"
              value={password.toString()}
              size="small"
              onChange={(event) => handlePasswordInputChange(event)}
              color="secondary"
              inputProps={{
                style: {
                  textAlign: "center",
                  color: (THEME.palette!.secondary as SimplePaletteColorOptions)
                    .main,
                },
              }}
            />
          </Grid>
          {accountType === AccountTypes.NEW && (
            <Grid item>
              <TextField
                focused
                type="password"
                id="password-confirm"
                label={t("CONFIRM PASSWORD", user.lang)}
                variant="outlined"
                value={passwordConfirm.toString()}
                size="small"
                onChange={(event) => handlePasswordConfirmInputChange(event)}
                color="secondary"
                inputProps={{
                  style: {
                    textAlign: "center",
                    color: (
                      THEME.palette!.secondary as SimplePaletteColorOptions
                    ).main,
                  },
                }}
              />
            </Grid>
          )}
          <Grid item container flexDirection="row" justifyContent="center">
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleLoginSubmit}
              fullWidth
            >
              <Typography align="center" variant="body2" color="secondary">
                <b>{t("PLAY", user.lang)}</b>
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default LoginModal;
