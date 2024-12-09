export interface IContact {
    id: string;
    name: string;
    jobTitle?: string;
    imageUrl?: string;
    email?: string;
    phoneNumbers: string[];
    address?: string;
}
