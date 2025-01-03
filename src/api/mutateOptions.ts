import { IContactFormData } from "../components/form/types";
import { IContact } from "../types";

const filterContactsById = (id: string, contacts: IContact[]) =>
  contacts.filter((c) => c.id !== id);

export function createContactOptions(formData: IContactFormData) {
  return {
    optimisticData: (contacts: IContact[]) => [
      ...contacts,
      { ...formData, id: "newContact" },
    ],
    populateCache: (createdContact: IContact, contacts: IContact[]) => [
      ...contacts,
      createdContact,
    ],
    rollbackOnError: true,
    revalidate: false,
  };
}

export function updateContactOptions(
  updatedContactId: string,
  formData: IContactFormData,
) {
  return {
    optimisticData: (contacts: IContact[]) => [
      ...filterContactsById(updatedContactId, contacts),
      { ...formData, id: updatedContactId },
    ],
    populateCache: (updatedContact: IContact, contacts: IContact[]) => [
      ...filterContactsById(updatedContact.id, contacts),
      updatedContact,
    ],
    rollbackOnError: true,
    revalidate: false,
  };
}

export function deleteContactOptions(contactId: string) {
  return {
    optimisticData: (contacts: IContact[]) =>
      filterContactsById(contactId, contacts),
    populateCache: (_deletedContact: IContact, contacts: IContact[]) =>
      filterContactsById(contactId, contacts),
    rollbackOnError: true,
    revalidate: false,
  };
}
