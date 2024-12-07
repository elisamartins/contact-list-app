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
    onClickContact: (id: string) => void;
}

export default function ContactList({ contacts, onClickContact }: Props) {
	return (
		<List>
			<ListSubheader>
				<Typography>{`Contacts (${contacts.length})`} </Typography>
				<Button variant={"contained"}>Add Contact</Button>
			</ListSubheader>
			{contacts.map((contact) => (
				<ListItemButton key={contact.id} onClick={() => onClickContact(contact.id)}>
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
