import {
	Avatar,
	Divider,
	Grid2 as Grid,
	IconButton,
	Paper,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { IContact } from "../types";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import MailOutline from "@mui/icons-material/MailOutline";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";

interface Props {
	contact: IContact;
	goBackComponent: React.ReactNode;
	onClickEdit: () => void;
	onClickDelete: () => void;
}

export default function ContactDetails({
	contact,
	goBackComponent,
	onClickEdit,
	onClickDelete,
}: Props) {
	const theme = useTheme();
	const mobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Grid container spacing={3} direction="column">
			<Grid container wrap="nowrap">
				{mobile && <Grid>{goBackComponent}</Grid>}
				<Grid container sx={{
					flex:1,
						flexDirection: mobile ? 'column' : 'row',
						alignItems: "center",
						justifyContent: mobile ? 'center' : 'flex-start',
						textAlign: mobile ? 'center' : 'left',
				}}>
					<Avatar
						src={contact.imageUrl}
						sx={{
							height: 125,
							width: 125,
							border: "3px solid #f9fafb",
						}}
						component={Paper}
						elevation={2}
					/>
					<Stack sx={{ justifyContent: "center"}}>
						<Typography variant={"h5"} fontWeight={500} textAlign={"center"}>
							{contact.name}
						</Typography>
						<Typography variant={"subtitle1"}>
							{contact.jobTitle}
						</Typography>
					</Stack>
				</Grid>
				<Stack direction="row" sx={{ alignItems: "flex-start" }}>
					<IconButton onClick={onClickEdit}>
						<Edit />
					</IconButton>

					<IconButton onClick={onClickDelete} edge="end">
						<Delete />
					</IconButton>
				</Stack>
			</Grid>
			<Divider />
			<Grid container direction="column">
				{contact.address && (
					<Grid container spacing={2}>
						<PlaceOutlined />
						<Typography
							flex={1}
							sx={{
								wordBreak: "break-word",
							}}
						>
							{contact.address}
						</Typography>
					</Grid>
				)}

				{contact.email && (
					<Grid container spacing={2}>
						<MailOutline />
						<Typography>{contact.email}</Typography>
					</Grid>
				)}

				{contact.phoneNumbers.length > 0 && (
					<Grid container spacing={2}>
						<PhoneOutlined />
						<Grid container direction="column">
							{contact.phoneNumbers?.map((phone) => (
								<Typography key={phone}>{phone}</Typography>
							))}
						</Grid>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}
