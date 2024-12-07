import { Grid2 } from "@mui/material";
import ContactList from "./components/ContactList";
import { cacheKey, getContacts } from "./api/api";
import useSWR from "swr";
import { useState } from "react";
import ContactDetails from "./components/ContactDetails";
import { IContact } from "./types";

function App() {
	const [selectedContactId, setSelectedContactId] = useState<string | null>(
		null
	);
	const {
		data: contacts,
		error,
		isLoading,
		mutate,
	} = useSWR(cacheKey, getContacts);

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>{error}</div>;

	const selectedContact = contacts.find(
		(contact: IContact) => contact.id == selectedContactId
	);

	return (
		<Grid2 container>
			<ContactList
				contacts={contacts}
				onClickContact={(id) => setSelectedContactId(id)}
			/>
			{selectedContact && <ContactDetails contact={selectedContact} />}
		</Grid2>
	);
}

export default App;
