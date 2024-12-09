import { Grid2 as Grid, useMediaQuery, useTheme } from "@mui/material";

export default function ResponsiveLayout({
  children,
  activePanelIndex,
}: {
  children: React.ReactNode[];
  activePanelIndex: 0 | 1;
}) {
  const [leftPanel, rightPanel] = children;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (mobile) {
    if (activePanelIndex == 0) return leftPanel;
    if (activePanelIndex == 1)
      return (
        <Grid py={2} px={3}>
          {rightPanel}
        </Grid>
      );
    return null;
  }

  return (
    <Grid
      container
      direction={"column"}
      overflow={"hidden"}
      alignContent={"flex-start"}
      sx={{
        height: "100vh",
      }}
    >
      <Grid
        container
        overflow={"auto"}
        direction={"column"}
        size={{ sm: 5, md: 4, lg: 3 }}
        sx={{ borderRight: "1px solid #e5e7eb" }}
      >
        {leftPanel}
      </Grid>
      <Grid p={4} size={{ sm: 7, md: 8, lg: 6 }}>
        {rightPanel}
      </Grid>
    </Grid>
  );
}
