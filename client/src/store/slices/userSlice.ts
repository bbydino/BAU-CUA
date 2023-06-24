import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardItemName, Languages } from "../../util";
import type { RootState } from "../store";

// Define a type for the slice state
export interface UserState {
  userId: string;
  name: string;
  lang: Languages;
  money: number;
  winStreak: number;
  losingStreak: number;
  mostChosen: BoardItemName | undefined;
  mostWon: BoardItemName | undefined;
  mostLost: BoardItemName | undefined;
}

// Define the initial state using that type
const initialState: UserState = {
  userId: "guest",
  name: "guest",
  lang: Languages.ENGLISH,
  money: 1000,
  winStreak: 0,
  losingStreak: 0,
  mostChosen: undefined,
  mostWon: undefined,
  mostLost: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.lang = action.payload.lang;
      state.money = action.payload.money;
      state.winStreak = action.payload.winStreak;
      state.losingStreak = action.payload.losingStreak;
      state.mostChosen = action.payload.mostChosen;
      state.mostWon = action.payload.mostWon;
      state.mostLost = action.payload.mostLost;
    },
    setLang: (state, action: PayloadAction<Languages>) => {
      state.lang = action.payload;
    },
    setMoney: (state, action: PayloadAction<number>) => {
      state.money = action.payload;
    },
    setWinStreak: (state, action: PayloadAction<number>) => {
      state.winStreak = action.payload;
    },
    setLosingStreak: (state, action: PayloadAction<number>) => {
      state.losingStreak = action.payload;
    },
  },
});

export const { setLang, setMoney, setWinStreak, setLosingStreak, setUser } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectName = (state: RootState) => state.user.name;
export const selectMoney = (state: RootState) => state.user.money;

export default userSlice.reducer;
