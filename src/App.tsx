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
import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function App() {
	const [createContactFormOpen, setCreateContactFormOpen] =
		useState<boolean>(false);
	const [updateContactFormOpen, setUpdateContactFormOpen] =
		useState<boolean>(false);
	const [activePanel, setActivePanel] = useState<0 | 1>(0);

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

	function handleUpdateContact(formData: IContactFormData) {
		if (!selectedContactId) return;
		mutate(
			updateContact(selectedContactId, formData),
			updateContactOptions(selectedContactId, formData)
		);
		setUpdateContactFormOpen(false);
	}

	function handleCreateContact(formData: IContactFormData) {
		mutate(createContact(formData), createContactOptions(formData)).then(
			() => setCreateContactFormOpen(false)
		);
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
			<ResponsiveLayout activePanelIndex={activePanel}>
				<ContactList
					selectedContactId={selectedContactId}
					contacts={contacts}
					onClickContact={(id) => {
						setSelectedContactId(id);
						setActivePanel(1);
					}}
					onClickAddContact={() => setCreateContactFormOpen(true)}
				/>
				{selectedContact && (
					<ContactDetails
						key={`${selectedContactId}-contact-details`}
						contact={selectedContact}
						onClickEdit={() => setUpdateContactFormOpen(true)}
						onClickDelete={handleDeleteContact}
						goBackComponent={
							<IconButton
								onClick={() => {
									setActivePanel(0);
									setSelectedContactId(null);
								}}
							>
								<ArrowBack />
							</IconButton>
						}
					/>
				)}
			</ResponsiveLayout>
			<ContactFormDialog
				open={createContactFormOpen}
				onClose={() => setCreateContactFormOpen(false)}
				onSubmitForm={handleCreateContact}
			/>
			{selectedContact && (
				<ContactFormDialog
					key={`${selectedContactId}-form-dialog`}
					open={updateContactFormOpen}
					onClose={() => setUpdateContactFormOpen(false)}
					onSubmitForm={handleUpdateContact}
					initialValues={selectedContact}
				/>
			)}
		</>
	);
}

export default App;
