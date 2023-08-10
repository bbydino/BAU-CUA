import {
  Alert,
  Box,
  Button,
  Grid,
  Modal,
  SimplePaletteColorOptions,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { BG_STYLE, THEME, socket, t } from "../../util";
import HowToPlay from "./HowToPlay";
import LangSelect from "./LangSelect";

interface JoinModalProps {
  isOpen: boolean;
  handleJoinSuccess: () => void;
}
const JoinModal: React.FC<JoinModalProps> = ({ isOpen, handleJoinSuccess }) => {
  const user = useAppSelector((state) => state.user);
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  const handleRoomInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRoom(event.target.value);
  };

  const handleJoinSubmit = () => {
    if (room === "" || name === "") {
      setError("NAME AND ROOM CANNOT BE EMPTY");
      return;
    }

    setError("");
    socket.emit("join", { name: name, room: room }, (err: string) => {
      if (err) setError(err);
      else {
        handleJoinSuccess();
      }
    });
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
          <Grid item>
            <LangSelect />
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
              label={t("NAME", user.lang)}
              id="name"
              variant="outlined"
              value={name}
              size="small"
              onChange={(event) => handleNameInputChange(event)}
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
              type="text"
              label={t("ROOM NAME", user.lang)}
              id="room"
              variant="outlined"
              value={room}
              size="small"
              onChange={(event) => handleRoomInputChange(event)}
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
          <Grid item container flexDirection="row" justifyContent="center">
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleJoinSubmit}
              fullWidth
            >
              <Typography align="center" variant="body2" color="primary">
                <b>{t("PLAY", user.lang)}</b>
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default JoinModal;
