import { Grid, Input, Typography } from "@mui/material";
import React from "react";
import { BoardItem } from "../util";

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
        <Input
          fullWidth
          value={value}
          size="small"
          onChange={(event) => handleInputChange(item, event)}
          onBlur={() => handleBlur(item)}
          inputProps={{
            step: 1,
            min: 0,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
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
