import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ContactForm from "../../src/components/form/ContactForm";
import { it, expect, describe, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { IContactFormData } from "../../src/components/form/types";
import { getName, getJobTitle, getEmail, getAddress, getImageUrl, getPhones, clickSubmitButton, getAddPhoneNumber, getFirstPhoneDeleteButton } from "./helpers";

describe(ContactForm, () => {
	describe("without initial values", () => {
		const mockOnSubmitForm = vi.fn();

		beforeEach(() => {
			mockOnSubmitForm.mockClear();
			render(
				<ContactForm
					onCancel={() => {}}
					onSubmitForm={mockOnSubmitForm}
				/>
			);
		});

		it("calls the onSubmit function when all fields are valid", async () => {
			await userEvent.type(getName(), "Johnny Appleseed");
			await userEvent.type(getJobTitle(), "Frontend Developer");
			await userEvent.type(getEmail(), "johnny.appleseed@gmail.com");
			await userEvent.type(getAddress(), "123 Apple St.");
			await userEvent.type(getImageUrl(), "https://mock.com");
			await userEvent.type(getPhones()[0], "1234567890");

			clickSubmitButton();

			await waitFor(() => {
				expect(mockOnSubmitForm).toHaveBeenCalledOnce();
			});

			expect(mockOnSubmitForm).toHaveBeenCalledWith({
				name: "Johnny Appleseed",
				jobTitle: "Frontend Developer",
				address: "123 Apple St.",
				email: "johnny.appleseed@gmail.com",
				phoneNumbers: ["1234567890"],
				imageUrl: "https://mock.com",
			});
		});

		it("has name as required field", async () => {
			clickSubmitButton();
			await waitFor(() => {
				expect(getName()).toBeInvalid();
			});
		});

		it("adds a phone field", async () => {
			const addButton = getAddPhoneNumber();
			await userEvent.click(addButton);
			const phoneFields = getPhones();
			expect(phoneFields).toHaveLength(2);
			expect(addButton).toBeInTheDocument();
		});

		it("has a maximum of 3 phone fields", async () => {
			const addButton = getAddPhoneNumber();
			await userEvent.click(addButton);
			await userEvent.click(addButton);
			const phoneFields = getPhones();
			expect(phoneFields).toHaveLength(3);
			expect(addButton).not.toBeInTheDocument();
		});

		it("removes phone field", async () => {
			const addButton = getAddPhoneNumber();
			await userEvent.click(addButton);
			const firstDeleteButton = getFirstPhoneDeleteButton();
			await userEvent.click(firstDeleteButton);
			const phoneFields = screen.getAllByPlaceholderText("Phone Number");
			expect(phoneFields).toHaveLength(1);
		});

		it("shows error when phone is invalid", async () => {
			const phoneFields = getPhones();
			expect(phoneFields).toHaveLength(1);
			await userEvent.type(phoneFields[0], "123");
			clickSubmitButton();
			await waitFor(() => {
				expect(phoneFields[0]).toBeInvalid();
			});
		});
	});

	describe("with initialValues", () => {
		const mockOnSubmitForm = vi.fn();
		const mockContact: IContactFormData = {
			name: "Johnny Appleseed",
			jobTitle: "Frontend Developer",
			address: "123 Apple Street",
			email: "johnny.appleseed@gmail.com",
			imageUrl: "https://mock-image.com",
			phoneNumbers: [],
		};

		beforeEach(() => {
			mockOnSubmitForm.mockClear();
			render(
				<ContactForm
					onCancel={() => {}}
					onSubmitForm={mockOnSubmitForm}
					initialValues={mockContact}
				/>
			);
		});

		it("calls the onSubmit function when all fields are valid", async () => {
			clickSubmitButton();

			await waitFor(() => {
				expect(mockOnSubmitForm).toHaveBeenCalledTimes(1);
			});

			expect(mockOnSubmitForm).toHaveBeenCalledWith(mockContact);
		});
	});
});