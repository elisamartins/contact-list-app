import ContactList from "./components/ContactList";
import { useState } from "react";
import ContactDetails from "./components/ContactDetails";
import ContactFormDialog from "./components/form/ContactFormDialog";
import ResponsiveLayout from "./components/ResponsiveLayout";
import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useContacts } from "./hooks/useContacts";
import ContactForm from "./components/form/ContactForm";

function App() {
	const [createContactFormOpen, setCreateContactFormOpen] =
		useState<boolean>(false);
	const [updateContactFormOpen, setUpdateContactFormOpen] =
		useState<boolean>(false);
	const [activePanel, setActivePanel] = useState<0 | 1>(0);

	const {
		contacts,
		isLoading,
		error,

		selectedContact,
		selectedContactId,
		setSelectedContactId,

		handleCreateContact,
		handleUpdateContact,
		handleDeleteContact,
	} = useContacts();

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>{error}</div>;

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
								edge="start"
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
			>
				<ContactForm
					onCancel={() => setCreateContactFormOpen(false)}
					onSubmitForm={handleCreateContact}
				/>
			</ContactFormDialog>

			{selectedContact && (
				<ContactFormDialog
					key={`${selectedContactId}-form-dialog`}
					hasInitialValues
					open={updateContactFormOpen}
					onClose={() => setUpdateContactFormOpen(false)}
				>
					<ContactForm
						onSubmitForm={handleUpdateContact}
						initialValues={selectedContact}
						onCancel={() => setCreateContactFormOpen(false)}
					/>
				</ContactFormDialog>
			)}
		</>
	);
}

export default App;
