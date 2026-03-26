import { Typography, useTheme } from "@mui/material";
import { getAssetUrl } from "../../config";
import PanelShell from "ui/PanelShell";
import SplitLayout from "ui/SplitLayout";

const SpotlightCard = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <PanelShell>
      <SplitLayout>
        <Typography color={dark} variant="h5" fontWeight="500">
          Featured
        </Typography>
        <Typography color={medium}>Campaign Studio</Typography>
      </SplitLayout>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={getAssetUrl("info1.jpeg")}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <SplitLayout>
        <Typography color={main}>Northwind Studio</Typography>
        <Typography color={medium}>northwindstudio.co</Typography>
      </SplitLayout>
      <Typography color={medium} m="0.5rem 0">
        Explore a clean campaign mockup that keeps the layout polished without
        affecting any application behavior.
      </Typography>
    </PanelShell>
  );
};

export default SpotlightCard;
