import { IContact } from "../../types";

export interface IPhoneInput {
	number?: string;
}

export interface IFormInput {
	name: string;
	jobTitle?: string;
	address?: string;
	email?: string;
	phoneNumbers?: IPhoneInput[];
	imageUrl?: string;
}

export type IContactFormData = Omit<IContact, "id">;