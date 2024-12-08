import { Grid2, useMediaQuery, useTheme } from "@mui/material";

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
		<Grid2 container>
			{leftPanel}
			{rightPanel}
		</Grid2>
	);
}
