import ContactList from "./components/ContactList";
import {
	cacheKey,
	createContact,
	deleteContact,
	getContacts,
	updateContact,
} from "./api/api";
import useSWR from "swr";
import { useEffect, useState } from "react";
import ContactDetails from "./components/ContactDetails";
import { IContact, IContactFormData } from "./types";
import ContactFormDialog from "./components/ContactFormDialog";
import {
	createContactOptions,
	deleteContactOptions,
	updateContactOptions,
} from "./api/mutateOptions";
import ResponsiveLayout from "./components/ResponsiveLayout";

enum FormState {
  ADD,
  UPDATE,
  CLOSED
}

function App() {
	const [formDialogState, setFormDialogState] = useState<FormState>(FormState.CLOSED);
	const [selectedContactId, setSelectedContactId] = useState<string | null>();
	const {
		data: contacts,
		error,
		isLoading,
		mutate,
	} = useSWR(cacheKey, getContacts);

	useEffect(() => {
		if (contacts) {
			const isValidId = contacts.some(
				(c: IContact) => c.id === selectedContactId
			);
			if (!selectedContactId || !isValidId) {
				setSelectedContactId(contacts[0]?.id || null);
			}
		}
	}, [contacts, selectedContactId]);

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
		setFormDialogState(FormState.UPDATE);
	}

	function handleDeleteContact() {
		if (!selectedContactId) return;
		mutate(
			deleteContact(selectedContactId),
			deleteContactOptions(selectedContactId)
		);
	}

	return (
		<>
			<ResponsiveLayout activePanelIndex={!selectedContactId ? 0 : 1}>
				<ContactList
					selectedContactId={selectedContactId}
					contacts={contacts}
					onClickContact={(id) => setSelectedContactId(id)}
					onClickAddContact={() => setFormDialogState(FormState.ADD)}
				/>
				{selectedContact && (
					<ContactDetails
						key={`${selectedContactId}-contact-details`}
						contact={selectedContact}
						onClickEdit={() => setFormDialogState(FormState.UPDATE)}
						onClickDelete={handleDeleteContact}
					/>
				)}
			</ResponsiveLayout>
			<ContactFormDialog
				key={`${selectedContactId || "create-contact"}-form-dialog`}
				open={[FormState.ADD, FormState.UPDATE].includes(formDialogState)}
				onClose={() => setFormDialogState(FormState.CLOSED)}
				onSubmitForm={handleFormSubmit}
				initialValues={formDialogState == FormState.UPDATE && selectedContact}
			/>
		</>
	);
}

export default App;
