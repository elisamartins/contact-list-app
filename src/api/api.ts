import { IContactFormData } from "../components/form/types";

const API_URL = import.meta.env.VITE_API_URL;
export const cacheKey = "/contacts";

export function getContacts() {
	return fetch(`${API_URL}${cacheKey}`).then((result) => result.json());
}

export function createContact(contactFormData: IContactFormData) {
	return fetch(`${API_URL}${cacheKey}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(contactFormData),
	}).then((result) => result.json());
}

export function updateContact(
	contactId: string,
	contactFormData: IContactFormData
) {
	return fetch(`${API_URL}${cacheKey}/${contactId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(contactFormData),
	}).then((result) => result.json());
}

export function deleteContact(contactId: string) {
	return fetch(`${API_URL}${cacheKey}/${contactId}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
	}).then((result) => result.json());
}
