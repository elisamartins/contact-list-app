import { Grid2 } from "@mui/material";
import ContactList from "./components/ContactList";
import { cacheKey, createContact, getContacts, updateContact } from "./api/api";
import useSWR from "swr";
import { useState } from "react";
import ContactDetails from "./components/ContactDetails";
import { IContact, IContactFormData } from "./types";
import ContactFormDialog from "./components/ContactFormDialog";
import {
	createContactOptions,
	updateContactOptions,
} from "./api/mutateOptions";

function App() {
	const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false);
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

	function handleFormSubmit(formData: IContactFormData) {
		if (selectedContactId) {
			mutate(
				updateContact(selectedContactId, formData),
				updateContactOptions(selectedContactId, formData)
			);
		} else {
			mutate(createContact(formData), createContactOptions(formData));
		}
    setFormDialogOpen(false);
	}

	return (
		<Grid2 container>
			<ContactList
				contacts={contacts}
				onClickContact={(id) => setSelectedContactId(id)}
				onClickAddContact={() => setFormDialogOpen(true)}
			/>
			{selectedContact && (
				<ContactDetails
					key={`${selectedContactId}-contact-details`}
					contact={selectedContact}
				/>
			)}

			<ContactFormDialog
				key={`${selectedContactId || "create-contact"}-form-dialog`}
				open={formDialogOpen}
				onClickCancel={() => setFormDialogOpen(false)}
				onSubmitForm={handleFormSubmit}
			/>
		</Grid2>
	);
}

export default App;
