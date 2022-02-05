import {
  Avatar,
  Button,
  ButtonGroup,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import React from "react";

interface BoardItemProps {
  name: string;
  image: string;
  color: string;
  onClick: (item: string) => void;
}
const BoardItem: React.FC<BoardItemProps> = ({
  name,
  image,
  color,
  onClick,
}) => {
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
        <Avatar
          src={image}
          alt={name}
          sx={{
            width: "100px",
            height: "100px",
            border: "6.9px solid " + color,
          }}
          onClick={() => onClick(name)}
        />
      </Grid>
      <Grid
        item
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          align="center"
          width="100%"
          variant="overline"
          color="secondary"
        >
          {name}
        </Typography>
        <ButtonGroup variant="contained" disableElevation>
          <Button size="small">+</Button>
          <Input placeholder="bet $$$" color="primary" />
          <Button size="small">-</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default BoardItem;
