import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface UserState {
  name: string;
  money: number;
}

// Define the initial state using that type
const initialState: UserState = {
  name: "username",
  money: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMoney: (state, action: PayloadAction<number>) => {
      state.money += action.payload;
    },
  },
});

export const { setMoney } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectName = (state: RootState) => state.user.name;
export const selectMoney = (state: RootState) => state.user.money;

export default userSlice.reducer;
