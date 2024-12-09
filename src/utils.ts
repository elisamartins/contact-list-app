import { IContact } from "./types";

export function sortContactsByName(contacts: IContact[]) {
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}
