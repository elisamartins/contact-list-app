import { useState, useEffect } from "react";
import { IContact } from "../types";
import {
  cacheKey,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} from "../api/api";
import useSWR from "swr";
import {
  createContactOptions,
  deleteContactOptions,
  updateContactOptions,
} from "../api/mutateOptions";
import { IContactFormData } from "../components/form/types";

export function useContacts() {
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
        (c: IContact) => c.id === selectedContactId,
      );
      if (!selectedContactId || !isValidId) {
        setSelectedContactId(contacts[0]?.id || null);
      }
    }
  }, [contacts, selectedContactId]);

  const selectedContact = contacts?.find(
    (contact: IContact) => contact.id === selectedContactId,
  );

  const handleCreateContact = (formData: IContactFormData) =>
    mutate(createContact(formData), createContactOptions(formData)).then(
      (result) => setSelectedContactId(result.id),
    );

  const handleUpdateContact = (formData: IContactFormData) =>
    mutate(
      updateContact(selectedContactId!, formData),
      updateContactOptions(selectedContactId!, formData),
    );

  const handleDeleteContact = () =>
    mutate(
      deleteContact(selectedContactId!),
      deleteContactOptions(selectedContactId!),
    );

  const handleContactSelected = (contactId: string | null) => {
    setSelectedContactId(contactId);
  };

  return {
    contacts,
    isLoading,
    error,

    selectedContact,
    selectedContactId,

    handleContactSelected,
    handleCreateContact,
    handleUpdateContact,
    handleDeleteContact,
  };
}
