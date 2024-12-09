import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ContactForm from "../../src/components/form/ContactForm";
import { it, expect, describe, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { IContactFormData } from "../../src/components/form/types";

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

			clickSubmitButton();

			await waitFor(() => {
				expect(mockOnSubmitForm).toHaveBeenCalledOnce();
			});

			expect(mockOnSubmitForm).toHaveBeenCalledWith({
				name: "Johnny Appleseed",
				jobTitle: "Frontend Developer",
				address: "123 Apple St.",
				email: "johnny.appleseed@gmail.com",
				phoneNumbers: [],
				imageUrl: "https://mock.com",
			});
		});

		it("has name as required field", async () => {
			clickSubmitButton();
			await waitFor(() => {
				expect(getName()).toBeInvalid();
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

function getName() {
	return screen.getByRole("textbox", {
		name: /name/i,
	});
}

function getJobTitle() {
	return screen.getByRole("textbox", {
		name: /job title/i,
	});
}

function getEmail() {
	return screen.getByRole("textbox", {
		name: /email/i,
	});
}

function getAddress() {
	return screen.getByRole("textbox", {
		name: /address/i,
	});
}

function getImageUrl() {
	return screen.getByRole("textbox", {
		name: /image url/i,
	});
}

function clickSubmitButton() {
	userEvent.click(screen.getByRole("button", { name: /save changes/i }));
}
