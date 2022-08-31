import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardItemName, Languages } from "../../util";
import type { RootState } from "../store";

// Define a type for the slice state
export interface UserState {
  name: string;
  lang: Languages;
  money: number;
  winStreak: number;
  loseStreak: number;
  mostChosen: BoardItemName | undefined;
  mostWon: BoardItemName | undefined;
  mostLost: BoardItemName | undefined;
}

// Define the initial state using that type
const initialState: UserState = {
  name: "guest",
  lang: Languages.ENGLISH,
  money: 1000,
  winStreak: 0,
  loseStreak: 0,
  mostChosen: undefined,
  mostWon: undefined,
  mostLost: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMoney: (state, action: PayloadAction<number>) => {
      state.money += action.payload;
    },
    setLang: (state, action: PayloadAction<Languages>) => {
      state.lang = action.payload;
    },
  },
});

export const { setMoney, setLang } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectName = (state: RootState) => state.user.name;
export const selectMoney = (state: RootState) => state.user.money;

export default userSlice.reducer;
