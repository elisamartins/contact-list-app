// hooks/useContacts.ts
import { useState, useEffect } from "react";
import { IContact, IContactFormData } from "../types";
import { cacheKey, getContacts, createContact, deleteContact, updateContact } from "../api/api";
import useSWR from "swr";
import {
  createContactOptions,
  deleteContactOptions,
  updateContactOptions,
} from "../api/mutateOptions";

export function useContacts() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>();
  const { data: contacts, error, isLoading, mutate } = useSWR(cacheKey, getContacts);

  useEffect(() => {
    if (contacts) {
      const isValidId = contacts.some((c: IContact) => c.id === selectedContactId);
      if (!selectedContactId || !isValidId) {
        setSelectedContactId(contacts[0]?.id || null);
      }
    }
  }, [contacts, selectedContactId]);

  const selectedContact = contacts?.find((contact: IContact) => contact.id === selectedContactId);

  const handleCreateContact = (formData: IContactFormData) =>
    mutate(createContact(formData), createContactOptions(formData));

  const handleUpdateContact = (formData: IContactFormData) =>
    mutate(updateContact(selectedContactId!, formData), updateContactOptions(selectedContactId!, formData));

  const handleDeleteContact = () =>
    mutate(deleteContact(selectedContactId!), deleteContactOptions(selectedContactId!));

  return {
    contacts,
    isLoading,
    error,

    selectedContact,
    selectedContactId,
    setSelectedContactId,
    
    handleCreateContact,
    handleUpdateContact,
    handleDeleteContact,
  };
}