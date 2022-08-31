import { Avatar } from "@mui/material";
import React from "react";
import { BoardItem } from "../../util";

interface DiceProps {
  item: BoardItem;
}
const Dice: React.FC<DiceProps> = ({ item }) => {
  return (
    <Avatar
      src={item.img}
      alt={item.name}
      variant="rounded"
      sx={{
        width: "13vw",
        height: "13vw",
        maxHeight: "100px",
        maxWidth: "100px",
        border: "5px solid " + item.color,
      }}
    />
  );
};

export default Dice;
