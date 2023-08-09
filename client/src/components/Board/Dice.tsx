import { Avatar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import { BoardItem, t } from "../../util";

interface DiceProps {
  item: BoardItem;
}
const Dice: React.FC<DiceProps> = ({ item }) => {
  const user = useAppSelector((state) => state.user);

  return (
    <Tooltip
      title={
        <Typography
          align="center"
          width="100%"
          variant="body2"
          color="secondary"
        >
          {t(item.name, user.lang)}
        </Typography>
      }
      placement="top"
      followCursor
    >
      <Avatar
        src={item.img}
        alt={item.name}
        variant="rounded"
        sx={{
          width: "10vh",
          height: "10vh",
          maxHeight: "100px",
          maxWidth: "100px",
          border: "5px solid " + item.color,
        }}
      />
    </Tooltip>
  );
};

export default Dice;
