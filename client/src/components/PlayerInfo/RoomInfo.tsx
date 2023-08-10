import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CARD_STYLE, socket } from "../../util";

interface RoomUser {
  id: string;
  name: string;
  room: string;
}

const RoomInfo = () => {
  const [users, setUsers] = useState<RoomUser[]>([]);
  const [room, setRoom] = useState<string>("");

  /* TODO: chat messaging */
  /* TODO: view others' stats */

  useEffect(() => {
    socket.on(
      "roomData",
      ({ room, users }: { room: string; users: RoomUser[] }) => {
        setRoom(room);
        setUsers(users);
      }
    );

    return () => {
      socket.off("roomData");
    };
  }, []);

  return (
    <Grid
      container
      item
      flexDirection="column"
      justifyContent="flex-start"
      rowSpacing={1}
      xs={12}
      sx={CARD_STYLE}
    >
      <Grid item>
        <Typography variant="h6" color="primary">
          ROOM: {room}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="secondary">
          ACTIVE USERS
        </Typography>
        {users.map((user) => (
          <Grid item key={user.id}>
            <Typography variant="caption" color="secondary">
              🟢 {user.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default RoomInfo;
