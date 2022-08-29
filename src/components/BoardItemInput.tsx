import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { BoardItem, FONT_FAMILY } from "../util";

interface BoardItemInputProps {
  item: BoardItem;
  value: number;
  handleBlur: (item: BoardItem) => void;
  handleInputChange: (
    item: BoardItem,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const BoardItemInput: React.FC<BoardItemInputProps> = ({
  item,
  value,
  handleBlur,
  handleInputChange,
}) => {
  return (
    <Grid item container flexDirection="column" justifyContent="center" xs={4}>
      <Grid item>
        <Typography
          align="center"
          width="100%"
          variant="body2"
          color="secondary"
        >
          <span>{item.name}</span>
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          type="number"
          variant="outlined"
          value={value.toString()}
          size="small"
          onChange={(event) => handleInputChange(item, event)}
          onBlur={() => handleBlur(item)}
          inputProps={{
            min: 0,
            max: 100,
            style: {
              textAlign: "center",
              backgroundColor: item.color,
              fontFamily: FONT_FAMILY,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default BoardItemInput;
