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

    handleContactSelected,
    handleCreateContact,
    handleUpdateContact,
    handleDeleteContact,
  } = useContacts();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <>
      <ResponsiveLayout activePanelIndex={activePanel}>
        <ContactList
          selectedContactId={selectedContactId}
          contacts={contacts}
          onClickContact={(id) => {
            handleContactSelected(id);
            setActivePanel(1);
          }}
          onClickAddContact={() => setCreateContactFormOpen(true)}
        />

        {selectedContact && (
          <ContactDetails
            key={`${selectedContactId}-contact-details`}
            contact={selectedContact}
            onClickEdit={() => setUpdateContactFormOpen(true)}
            onClickDelete={() => {
              handleDeleteContact();
              setActivePanel(0);
            }}
            goBackComponent={
              <IconButton
                onClick={() => {
                  setActivePanel(0);
                  handleContactSelected(null);
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
          onSubmitForm={(data) => {
            handleCreateContact(data).then(() => {
              setCreateContactFormOpen(false);
              setActivePanel(1);
            });
          }}
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
            onSubmitForm={(data) => {
              handleUpdateContact(data);
              setUpdateContactFormOpen(false);
            }}
            initialValues={selectedContact}
            onCancel={() => setUpdateContactFormOpen(false)}
          />
        </ContactFormDialog>
      )}
    </>
  );
}

export default App;
