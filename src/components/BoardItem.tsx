import { Avatar, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import { BoardItem as BoardItemModel, toViet } from "../util";

interface BoardItemProps {
  item: BoardItemModel;
  handleItemClick: (item: string) => void;
}
const BoardItem: React.FC<BoardItemProps> = ({ item, handleItemClick }) => {
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
            <React.Fragment>
              <Typography
                align="center"
                width="100%"
                variant="overline"
                color="secondary"
              >
                {toViet(item.name)}
              </Typography>
            </React.Fragment>
          }
          placement="bottom"
        >
          <Typography
            align="center"
            width="100%"
            variant="overline"
            color="secondary"
          >
            <b>{item.name}</b>
          </Typography>
        </Tooltip>
      </Grid>
      <Tooltip
        title={
          <React.Fragment>
            <Typography
              align="center"
              width="100%"
              variant="overline"
              color="secondary"
            >
              {toViet(item.name)}
            </Typography>
          </React.Fragment>
        }
        placement="top"
      >
        <Avatar
          src={item.img}
          alt={item.name}
          sx={{
            width: "20vw",
            height: "20vw",
            maxHeight: "169px",
            maxWidth: "169px",
            border: "6.9px solid " + item.color,
          }}
          onClick={() => handleItemClick(item.name)}
        />
      </Tooltip>
    </Grid>
  );
};

export default BoardItem;
