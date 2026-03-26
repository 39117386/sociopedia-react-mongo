import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, getAssetUrl } from "../../config";
import AvatarImage from "ui/AvatarImage";
import PanelShell from "ui/PanelShell";
import SplitLayout from "ui/SplitLayout";

const ProfileCard = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error("Failed to fetch user", response.status);
      return;
    }

    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <PanelShell>
      <SplitLayout
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <SplitLayout gap="1rem">
          <AvatarImage image={picturePath} size="60px" />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} connections</Typography>
          </Box>
        </SplitLayout>
        <ManageAccountsOutlined />
      </SplitLayout>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <SplitLayout mb="0.5rem">
          <Typography color={medium}>Profile views</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </SplitLayout>
        <SplitLayout>
          <Typography color={medium}>Post impressions</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </SplitLayout>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Presence
        </Typography>

        <SplitLayout gap="1rem" mb="0.5rem">
          <SplitLayout gap="1rem">
            <img src={getAssetUrl("twitter.png")} alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                X / Twitter
              </Typography>
              <Typography color={medium}>Short-form updates</Typography>
            </Box>
          </SplitLayout>
          <EditOutlined sx={{ color: main }} />
        </SplitLayout>

        <SplitLayout gap="1rem">
          <SplitLayout gap="1rem">
            <img src={getAssetUrl("linkedin.png")} alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Professional profile</Typography>
            </Box>
          </SplitLayout>
          <EditOutlined sx={{ color: main }} />
        </SplitLayout>
      </Box>
    </PanelShell>
  );
};

export default ProfileCard;
