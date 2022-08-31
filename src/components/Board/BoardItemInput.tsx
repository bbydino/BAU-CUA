import { Grid, TextField } from "@mui/material";
import React from "react";
import { BoardItem, MAX_BET_AMOUNT, MIN_BET_AMOUNT } from "../../util";

interface BoardItemInputProps {
  item: BoardItem;
  value: number;
  disabled: boolean;
  handleInputChange: (
    item: BoardItem,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const BoardItemInput: React.FC<BoardItemInputProps> = ({
  item,
  value,
  disabled,
  handleInputChange,
}) => {
  return (
    <Grid item container flexDirection="column" justifyContent="center" xs={4}>
      <Grid item>
        <TextField
          fullWidth
          type="number"
          variant="outlined"
          value={value.toString()}
          size="small"
          onChange={(event) => handleInputChange(item, event)}
          disabled={disabled}
          inputProps={{
            min: MIN_BET_AMOUNT,
            max: MAX_BET_AMOUNT,
            style: {
              textAlign: "center",
              backgroundColor: item.color,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default BoardItemInput;
