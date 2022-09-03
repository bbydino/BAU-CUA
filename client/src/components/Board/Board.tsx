import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import {
  setLosingStreak,
  setMoney,
  setWinStreak,
} from "../../store/slices/userSlice";
import {
  BoardItem as BoardItemModel,
  BoardItemValue,
  BOARD_ITEM_MAPPING,
  CARD_STYLE,
  formatMoney,
  MIN_BET_AMOUNT,
  t,
} from "../../util";
import BoardItem from "./BoardItem";
import Dice from "./Dice";

const Board = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const [values, setValues] = useState<BoardItemValue[]>(initValues);

  const [dice, setDice] = useState<BoardItemModel[]>([
    BOARD_ITEM_MAPPING[4],
    BOARD_ITEM_MAPPING[4],
    BOARD_ITEM_MAPPING[4],
  ]);

  const [isDiceRolling, setIsDiceRolling] = useState<boolean>(false);
  const [isBetSaved, setIsBetSaved] = useState<boolean>(false);
  const [isBetError, setIsBetError] = useState<boolean>(false);
  const [checkDice, setCheckDice] = useState<boolean>(false);

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
        setCheckDice(true);
      }, 1000);

      return () => {
        clearInterval(intervalId);
        setIsDiceRolling(false);
        setIsBetSaved(false);
      };
    }
  }, [isDiceRolling]);

  useEffect(() => {
    if (checkDice) {
      const netMoney = getNetMoney(values, dice);
      dispatch(setMoney(user.money + netMoney));

      if (netMoney > 0) {
        dispatch(setWinStreak(user.winStreak + 1));
        dispatch(setLosingStreak(0));
      } else if (netMoney < 0) {
        dispatch(setLosingStreak(user.losingStreak + 1));
        dispatch(setWinStreak(0));
      }

      setCheckDice(false);
    } else {
      setValues(getZeroValues(values));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkDice]);

  useEffect(() => {
    setIsBetError(getTotalBet(values) > user.money);
  }, [user.money, values]);

  const renderBoardItem = (item: BoardItemModel) => (
    <BoardItem
      key={item.name + "boardItem"}
      item={item}
      value={values[item.idx].value}
      disabled={isDiceRolling || isBetSaved}
      handleInputChange={handleInputChange}
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
    } else if (value < MIN_BET_AMOUNT) {
      newValues[item.idx].value = MIN_BET_AMOUNT;
    } else {
      newValues[item.idx].value = value;
    }
    setValues(newValues);
  };

  const getRandomDiceIdx = () =>
    Math.floor(Math.random() * BOARD_ITEM_MAPPING.length);

  const saveBet = () => {
    setIsBetSaved(true);
  };

  const rollDice = () => {
    setIsDiceRolling(true);
  };

  const resetValues = () => {
    setValues(getZeroValues(values));
  };

  return (
    <Grid
      container
      item
      flexDirection="column"
      justifyContent="space-around"
      rowSpacing={1}
      xl={7}
      sm={8}
      sx={CARD_STYLE}
    >
      <Grid container item flexDirection="row" justifyContent="center">
        {dice.map(renderDice)}
      </Grid>
      <Grid item>
        <Typography
          align="center"
          variant="h6"
          color={!isBetError ? "secondary" : "error"}
        >
          <b>
            {t(!isBetError ? "TOTAL BET" : "INVALID BET", user.lang) +
              ": $" +
              formatMoney(getTotalBet(values))}
          </b>
        </Typography>
      </Grid>
      <Grid item container flexDirection="row" justifyContent="space-evenly">
        {BOARD_ITEM_MAPPING.slice(0, 3).map(renderBoardItem)}
      </Grid>
      <Grid item container flexDirection="row" justifyContent="space-evenly">
        {BOARD_ITEM_MAPPING.slice(3, 6).map(renderBoardItem)}
      </Grid>
      <Grid item container flexDirection="row">
        <Grid item xs={6}>
          <Button
            variant="contained"
            size="large"
            color="success"
            onClick={saveBet}
            fullWidth
            disabled={isBetError || isDiceRolling}
            sx={{ height: "100%" }}
          >
            <Typography align="center" variant="h6" color="secondary">
              <b>{t("SAVE BET", user.lang)}</b>
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={resetValues}
            fullWidth
            disabled={isBetSaved || isDiceRolling}
            sx={{ height: "100%" }}
          >
            <Typography align="center" variant="h6" color="secondary">
              <b>{t("CLEAR BET", user.lang)}</b>
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={rollDice}
          fullWidth
          disabled={!isBetSaved}
          sx={{ height: "100%" }}
        >
          <Typography align="center" variant="h6" color="primary">
            <b>{t("ROLL DICE", user.lang)}</b>
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

const initValues = BOARD_ITEM_MAPPING.map((item) => ({
  item: item,
  value: 0,
}));

const getZeroValues = (values: BoardItemValue[]) => {
  let newValues = values.slice();
  for (const newValue of newValues) {
    newValues[newValue.item.idx].value = 0;
  }
  return newValues;
};

const getTotalBet = (values: BoardItemValue[]) =>
  values.reduce((a, b) => a + b.value, 0);

const getNetMoney = (values: BoardItemValue[], dice: BoardItemModel[]) => {
  let netMoney = 0;
  for (const value of values) {
    netMoney += dice.includes(value.item) ? value.value : -value.value;
  }
  return netMoney;
};

export default Board;
