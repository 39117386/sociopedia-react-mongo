import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import CreatePostComposer from "pages/components/CreatePostComposer";
import FeedTimeline from "pages/components/FeedTimeline";
import ProfileCard from "pages/components/ProfileCard";
import SpotlightCard from "pages/components/SpotlightCard";
import ConnectionsPanel from "pages/components/ConnectionsPanel";
import Header from "pages/header";

const FeedPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Header />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <ProfileCard userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <CreatePostComposer picturePath={picturePath} />
          <FeedTimeline userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <SpotlightCard />
            <Box m="2rem 0" />
            <ConnectionsPanel userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FeedPage;
