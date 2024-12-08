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
import { useMemo } from "react";
import { sortContactsByName } from "../utils";

interface Props {
    contacts: IContact[];
    selectedContactId?: string | null;
	onClickAddContact: () => void;
	onClickContact: (id: string) => void;
}

export default function ContactList({
    selectedContactId,
	contacts,
	onClickAddContact,
	onClickContact,
}: Props) {
	const sortedContacts = useMemo(
		() => sortContactsByName(contacts),
		[contacts]
	);

	return (
		<List disablePadding sx={{ backgroundColor: "white" }}>
			<ListSubheader
				sx={{
					px: 2,
					py: 3,
					display: "flex",
					gap: 2,
					flexDirection: "column",
					borderBottom: "1px solid #e5e7eb",
				}}
			>
				<Typography variant="h5" color="textPrimary" fontWeight={500}>
					{`Contacts (${sortedContacts.length})`}{" "}
				</Typography>
				<Button variant={"contained"} onClick={onClickAddContact}>
					Add Contact
				</Button>
			</ListSubheader>
			{sortedContacts.map((contact) => (
				<ListItemButton
					key={contact.id}
                    selected={selectedContactId == contact.id}
					onClick={() => onClickContact(contact.id)}
				>
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
