import { Avatar, Grid, Input, Typography, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { toViet } from "../util";

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
  const [value, setValue] = useState<number>(0);

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
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
            <React.Fragment>
              <Typography
                align="center"
                width="100%"
                variant="overline"
                color="secondary"
              >
                {toViet(name)}
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
            <b>{name}</b>
          </Typography>
        </Tooltip>
      </Grid>
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
                {toViet(name)}
              </Typography>
            </React.Fragment>
          }
          placement="top"
        >
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
        </Tooltip>
      </Grid>
      <Grid item>
        <Input
          value={value}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 1,
            min: 0,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
            style: {
              textAlign: "center",
              backgroundColor: color,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default BoardItem;
