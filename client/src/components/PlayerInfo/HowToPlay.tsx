import { Button, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { BG_STYLE, t } from "../../util";

const HowToPlay = () => {
  const user = useAppSelector((state) => state.user);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleOpenModal}
        fullWidth
      >
        <Typography align="center" variant="body2" color="secondary">
          <b>{t("HOW TO PLAY", user.lang)}</b>
        </Typography>
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
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
                <b>{t("HOW TO PLAY", user.lang)}</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="secondary">
                <b>
                  {t(
                    "THERE ARE SIX ITEMS ON THE BOARD (DEER, SQUASH, CHICKEN," +
                      " FISH, CRAB, SHRIMP), AND THREE DICE ARE ROLLED. EACH DIE" +
                      " HAS EQUAL CHANCE OF BEING ONE OF THE SIX ITEMS. YOU PLACE" +
                      " BETS ON WHAT ITEM YOU THINK THE DICE WILL SHOW. THEN YOU" +
                      " ROLL THE DIE. FOR EACH DICE THAT HAS YOUR SELECTED ITEM(S)," +
                      " YOU GET YOUR MONEY BACK PLUS WHATEVER YOU BET. IF THE DICE" +
                      " DON'T INCLUDE YOUR SELECTED ITEM(S), YOU LOSE THE MONEY YOU" +
                      " BET ON THOSE ITEM(S).",
                    user.lang
                  )}
                </b>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default HowToPlay;
