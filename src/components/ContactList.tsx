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
    onClickAddContact: () => void;
    onClickContact: (id: string) => void;
}

export default function ContactList({ contacts, onClickAddContact, onClickContact }: Props) {
	return (
		<List>
			<ListSubheader>
				<Typography>{`Contacts (${contacts.length})`} </Typography>
				<Button variant={"contained"} onClick={onClickAddContact}>Add Contact</Button>
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
