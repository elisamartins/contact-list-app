import { render, screen, waitFor } from "@testing-library/react";
import React, { act } from "react";
import * as useContactsModule from "../../src/hooks/useContacts"; // Import the module for mocking
import App from "../../src/App";
import { it, expect, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { setUpMockServer } from "./mockServer";
import { clickAddContactButton, clickDeleteButton, clickEditButton, clickSubmitButton, getJobTitle, getName } from "./helpers";

let allContacts = [
	{
		id: "1",
		name: "Jane Doe",
		jobTitle: "Software Engineer",
		phoneNumbers: [],
	},
	{
		id: "2",
		name: "John Doe",
		jobTitle: "Backend Developer",
		phoneNumbers: [],
	},
];

const mockServer = setUpMockServer(allContacts);

describe("App Integration Test", () => {
	const selectedContactId = "1";
	const mockHandleContactSelected = vi.fn();
	const mockHandleCreateContact = vi.fn(async (newContact) => {
		allContacts.push({ id: "newContact", ...newContact });
	});
	const mockHandleUpdateContact = vi.fn(async (updatedContact) => {
		allContacts = allContacts.map((c) => {
			if (c.id == selectedContactId) {
				return {
					...c,
					...updatedContact,
				};
			}
			return c;
		});
	});
	const mockHandleDeleteContact = vi.fn(async () => {
		allContacts = allContacts.filter((c) => c.id !== selectedContactId);
	});

	const setMockUseContacts = (overrides = {}) => {
		vi.spyOn(useContactsModule, "useContacts").mockReturnValue({
			contacts: allContacts,
			isLoading: false,
			error: null,
			selectedContact: allContacts[0],
			selectedContactId: "1",
			handleContactSelected: mockHandleContactSelected,
			handleCreateContact: mockHandleCreateContact,
			handleUpdateContact: mockHandleUpdateContact,
			handleDeleteContact: mockHandleDeleteContact,
			...overrides,
		});
	};
	

	beforeAll(() => mockServer.listen());
	afterAll(() => mockServer.close());
	afterEach(() => mockServer.resetHandlers());

	it("renders the contact list", async () => {
		setMockUseContacts();

		await act(async () => render(<App />));

		allContacts.forEach((contact) => {
			const contactButton = screen.getByRole("button", {
				name: new RegExp(`${contact.name} ${contact.jobTitle}`, "i"),
			});
			expect(contactButton).toBeInTheDocument();
		});

		expect(screen.getByText(/Contacts \(2\)/)).toBeInTheDocument();
	});

	it("shows an error message if there is an error fetching contacts", async () => {
		setMockUseContacts({error:  { message: "Failed to load contacts" }});

		await act(async () => render(<App />));

		expect(screen.getByText("Failed to load contacts")).toBeInTheDocument();
	});

	it("shows loading message when data is loading", async () => {
		setMockUseContacts({	contacts: [],
			isLoading: true,
			error: null});

		await act(async () => render(<App />));

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("creates user", async () => {
		setMockUseContacts();
		await act(async () => render(<App />));

		clickAddContactButton();
		const nameInput = await waitFor(() => getName());
		await userEvent.type(nameInput, "Johnny Appleseed");
		await userEvent.type(getJobTitle(), "Frontend Developer");

		clickSubmitButton();
		await waitFor(() => {
			expect(mockHandleCreateContact).toHaveBeenCalledOnce();
			expect(mockHandleCreateContact).toHaveBeenCalledWith({
				name: "Johnny Appleseed",
				jobTitle: "Frontend Developer",
				phoneNumbers: [],
				address: "",
				email: "",
				imageUrl: "",
			});
		});

		await waitFor(() => {
			const contactButton = screen.getByRole("button", {
				name: /Johnny Appleseed Frontend Developer/i,
			});
			expect(contactButton).toBeInTheDocument();
		});
	});

	it("updates user", async () => {
		setMockUseContacts()
		await act(async () => render(<App />));

		clickEditButton();

		const nameInput = await waitFor(() => getName());
		const jobTitleInput = getJobTitle();
		await userEvent.clear(nameInput);
		await userEvent.clear(jobTitleInput);
		await userEvent.type(nameInput, "Alice Johnson");
		await userEvent.type(jobTitleInput, "HR Manager");

		clickSubmitButton();
		await waitFor(() => {
			expect(mockHandleUpdateContact).toHaveBeenCalledOnce();
			expect(mockHandleUpdateContact).toHaveBeenCalledWith({
				id: "1",
				name: "Alice Johnson",
				jobTitle: "HR Manager",
				phoneNumbers: [],
				address: "",
				email: "",
				imageUrl: "",
			});
		});
	});

	it("deletes user", async () => {
		setMockUseContacts();
		await act(async () => render(<App />));

		clickDeleteButton();

		await waitFor(() => {
			expect(mockHandleDeleteContact).toHaveBeenCalledOnce();
		});
	});
});