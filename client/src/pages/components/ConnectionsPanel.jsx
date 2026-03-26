import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { API_URL } from "../../config";
import ConnectionCard from "ui/ConnectionCard";
import PanelShell from "ui/PanelShell";

const ConnectionsPanel = ({ userId }) => {
  const [profileFriends, setProfileFriends] = useState([]);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(`${API_URL}/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error("Failed to fetch friends", response.status);
      return;
    }

    const data = await response.json();
    setProfileFriends(data);

    if (userId === loggedInUserId) {
      dispatch(setFriends({ friends: data }));
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  const displayedFriends = userId === loggedInUserId ? friends : profileFriends;

  return (
    <PanelShell>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Connections
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {displayedFriends.map((friend) => (
          <ConnectionCard
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </PanelShell>
  );
};

export default ConnectionsPanel;
