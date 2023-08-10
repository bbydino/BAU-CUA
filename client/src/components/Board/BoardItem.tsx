import { Avatar, Grid, TextField, Tooltip, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useAppSelector } from "../../store/hooks";
import { BoardItem as BoardItemModel, t } from "../../util";

interface BoardItemProps {
  item: BoardItemModel;
  value: number;
  disabled: boolean;
  handleInputChange: (
    item: BoardItemModel,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
const BoardItem: React.FC<BoardItemProps> = ({
  item,
  value,
  disabled,
  handleInputChange,
}) => {
  const user = useAppSelector((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleItemClick = () => {
    inputRef.current?.focus();
  };

  return (
    <Grid
      item
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      xs={4}
    >
      <Grid item>
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
          placement="bottom"
          followCursor
        >
          <Avatar
            src={item.img}
            alt={item.name}
            sx={{
              width: "10vw",
              height: "10vw",
              maxHeight: "100px",
              maxWidth: "100px",
              border: "6.9px solid " + item.color,
            }}
            onClick={handleItemClick}
          />
        </Tooltip>
      </Grid>
      <Grid item>
        <TextField
          inputRef={inputRef}
          type="number"
          variant="outlined"
          value={value.toString()}
          size="small"
          onChange={(event) => handleInputChange(item, event)}
          disabled={disabled}
          inputProps={{
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

export default BoardItem;
