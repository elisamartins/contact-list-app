import {
	Avatar,
	Button,
	List,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Typography,
} from "@mui/material";
import { IContact } from "../types";

interface Props {
	contacts: IContact[];
}

export default function ContactList({ contacts }: Props) {
	return (
		<List>
			<ListSubheader>
				<Typography>{`Contacts (${contacts.length})`} </Typography>
				<Button variant={"contained"}>Add Contact</Button>
			</ListSubheader>
			{contacts.map((contact) => (
				<ListItemButton key={contact.id}>
					<ListItemAvatar>
						<Avatar src={contact.imageUrl} />
					</ListItemAvatar>
					<ListItemText
						primary={contact.name}
						secondary={contact.jobTitle}
					/>
				</ListItemButton>
			))}
		</List>
	);
}
