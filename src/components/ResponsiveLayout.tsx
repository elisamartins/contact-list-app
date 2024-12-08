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
		if (activePanelIndex == 1) return rightPanel;
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
				size={{ sm: 6, md: 4, lg: 3 }}
                sx={{borderRight:"1px solid #e5e7eb"}}
			>
				{leftPanel}
			</Grid>
			<Grid p={4}
            
				size={{ sm: 6, md: 4, lg: 4 }}>{rightPanel}</Grid>
		</Grid>
	);
}
