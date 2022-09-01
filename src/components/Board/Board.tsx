import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import {
  BoardItem as BoardItemModel,
  BoardItemValue,
  BOARD_ITEM_MAPPING,
  CARD_STYLE,
  formatMoney,
  t,
} from "../../util";
import BoardItem from "./BoardItem";
import BoardItemInput from "./BoardItemInput";
import Dice from "./Dice";

const Board = () => {
  const user = useAppSelector((state) => state.user);

  const [values, setValues] = useState<BoardItemValue[]>(
    BOARD_ITEM_MAPPING.map((item) => ({ item: item, value: 0 }))
  );

  const [dice, setDice] = useState<BoardItemModel[]>([
    BOARD_ITEM_MAPPING[4],
    BOARD_ITEM_MAPPING[4],
    BOARD_ITEM_MAPPING[4],
  ]);

  const [isDiceRolling, setIsDiceRolling] = useState<boolean>(false);
  const [isBetSaved, setIsBetSaved] = useState<boolean>(false);
  const [isBetError, setIsBetError] = useState<boolean>(false);

  useEffect(() => {
    if (isDiceRolling) {
      const intervalId = setInterval(() => {
        setDice([
          BOARD_ITEM_MAPPING[getRandomDiceIdx()],
          BOARD_ITEM_MAPPING[getRandomDiceIdx()],
          BOARD_ITEM_MAPPING[getRandomDiceIdx()],
        ]);
      }, 100);

      setTimeout(() => {
        clearInterval(intervalId);
        setIsDiceRolling(false);
        setIsBetSaved(false);
      }, 1000);

      return () => {
        clearInterval(intervalId);
        setIsDiceRolling(false);
        setIsBetSaved(false);
      };
    }
  }, [isDiceRolling]);

  console.log(dice);
  console.log(values);

  const renderBoardItem = (item: BoardItemModel) => (
    <BoardItem
      key={item.name + "boardItem"}
      item={item}
      handleItemClick={(name) => handleItemClick(name)}
    />
  );

  const renderBoardItemInput = (item: BoardItemModel) => (
    <BoardItemInput
      key={item.name + "input"}
      item={item}
      value={values[item.idx].value}
      handleInputChange={handleInputChange}
      disabled={isDiceRolling || isBetSaved}
    />
  );

  const renderDice = (item: BoardItemModel, idx: number) => (
    <Dice key={"dice" + idx} item={item} />
  );

  const handleInputChange = (
    item: BoardItemModel,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = Number(event.target.value);
    let newValues = values.slice();
    if (value === undefined) {
      // do nothing
    } else {
      newValues[item.idx].value = value;
    }
    setIsBetError(checkBoardForErrors());
    setValues(newValues);
  };

  const handleItemClick = (name: string) => {
    console.log("CLICK:", name);
  };

  const getRandomDiceIdx = () =>
    Math.floor(Math.random() * BOARD_ITEM_MAPPING.length);

  const getTotalBet = () => values.reduce((a, b) => a + b.value, 0);

  const checkBoardForErrors = () => getTotalBet() > user.money;

  const saveBet = () => {
    setIsBetSaved(true);
  };

  const rollDice = () => {
    setIsDiceRolling(true);
  };

  return (
    <Grid
      container
      item
      flexDirection="column"
      justifyContent="space-around"
      spacing={2}
      sx={CARD_STYLE}
    >
      <Grid container item flexDirection="row" justifyContent="center">
        {dice.map(renderDice)}
      </Grid>
      <Grid item>
        <Typography
          align="center"
          variant="h5"
          color={!isBetError ? "secondary" : "error"}
        >
          <b>
            {t(!isBetError ? "TOTAL BET" : "INVALID BET", user.lang) +
              ": $" +
              formatMoney(getTotalBet())}
          </b>
        </Typography>
      </Grid>
      <Grid
        container
        item
        flexDirection="row"
        justifyContent="space-evenly"
        wrap="wrap"
      >
        {BOARD_ITEM_MAPPING.slice(0, 3).map(renderBoardItem)}
        {BOARD_ITEM_MAPPING.slice(0, 3).map(renderBoardItemInput)}
      </Grid>
      <Grid container item flexDirection="row" justifyContent="space-evenly">
        {BOARD_ITEM_MAPPING.slice(3, 6).map(renderBoardItem)}
        {BOARD_ITEM_MAPPING.slice(3, 6).map(renderBoardItemInput)}
      </Grid>
      <Grid item container flexDirection="row">
        <Grid item xs={6}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={saveBet}
            fullWidth
            disabled={isBetError}
            sx={{ height: "100%" }}
          >
            <Typography align="center" variant="h5" color="primary">
              <b>{t("SAVE BET", user.lang)}</b>
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={rollDice}
            fullWidth
            disabled={!isBetSaved}
            sx={{ height: "100%" }}
          >
            <Typography align="center" variant="h5" color="secondary">
              <b>{t("ROLL DICE", user.lang)}</b>
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Board;
