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

function App() {
	const [createContactFormOpen, setCreateContactFormOpen] =
		useState<boolean>(false);
	const [updateContactFormOpen, setUpdateContactFormOpen] =
		useState<boolean>(false);

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

	const selectedContact = contacts?.find(
		(contact: IContact) => contact.id == selectedContactId
	);

	function handleFormSubmit(formData: IContactFormData) {
		if (selectedContactId) {
			mutate(
				updateContact(selectedContactId, formData),
				updateContactOptions(selectedContactId, formData)
			);
			setUpdateContactFormOpen(false);
		}
		mutate(createContact(formData), createContactOptions(formData));
		setCreateContactFormOpen(false);
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
					onClickAddContact={() => setCreateContactFormOpen(true)}
				/>
				{selectedContact && (
					<ContactDetails
						key={`${selectedContactId}-contact-details`}
						contact={selectedContact}
						onClickEdit={() => setUpdateContactFormOpen(true)}
						onClickDelete={handleDeleteContact}
					/>
				)}
			</ResponsiveLayout>
			<ContactFormDialog
				open={createContactFormOpen}
				onClose={() => setCreateContactFormOpen(false)}
				onSubmitForm={handleFormSubmit}
			/>
			{selectedContact && (
				<ContactFormDialog
					key={`${selectedContactId}-form-dialog`}
					open={updateContactFormOpen}
					onClose={() => setUpdateContactFormOpen(false)}
					onSubmitForm={handleFormSubmit}
					initialValues={selectedContact}
				/>
			)}
		</>
	);
}

export default App;
