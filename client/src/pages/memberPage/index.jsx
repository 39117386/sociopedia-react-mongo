import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import ConnectionsPanel from "pages/components/ConnectionsPanel";
import CreatePostComposer from "pages/components/CreatePostComposer";
import FeedTimeline from "pages/components/FeedTimeline";
import ProfileCard from "pages/components/ProfileCard";
import Header from "pages/header";

const MemberPage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const loggedInUserPicturePath = useSelector((state) => state.user.picturePath);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        console.error("Failed to fetch profile user", response.status);
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Header />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/* LEFT COLUMN */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <ProfileCard userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <ConnectionsPanel userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <CreatePostComposer picturePath={loggedInUserPicturePath} />
          <Box m="2rem 0" />
          <FeedTimeline userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default MemberPage;
